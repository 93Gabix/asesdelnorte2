// Código para contar los clics en el botón de WhatsApp y mostrar estadísticas mensuales
        document.addEventListener('DOMContentLoaded', function() {
            const whatsappBtn = document.getElementById('whatsappBtn');
            const clickCounter = document.getElementById('clickCounter');
            
            // Función para obtener la clave del mes actual (formato: "clicks-YYYY-MM")
            function getCurrentMonthKey() {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1; // getMonth() devuelve 0-11
                return `clicks-${year}-${month}`;
            }
            
            // Función para verificar si el mes ha cambiado
            function checkAndResetMonthlyCounter() {
                const lastMonthKey = localStorage.getItem('lastMonthKey');
                const currentMonthKey = getCurrentMonthKey();
                
                if (lastMonthKey && lastMonthKey !== currentMonthKey) {
                    // El mes ha cambiado, guardar el contador anterior en el historial
                    const lastMonthClicks = localStorage.getItem(lastMonthKey) || 0;
                    localStorage.setItem(`history-${lastMonthKey}`, lastMonthClicks);
                    
                    // Resetear contador para el mes nuevo
                    localStorage.setItem(currentMonthKey, 0);
                }
                
                // Si no existe el registro para el mes actual, inicializarlo
                if (!localStorage.getItem(currentMonthKey)) {
                    localStorage.setItem(currentMonthKey, 0);
                }
                
                // Actualizar la clave del mes actual
                localStorage.setItem('lastMonthKey', currentMonthKey);
                return currentMonthKey;
            }
            
            // Inicializar/verificar contador mensual
            const monthKey = checkAndResetMonthlyCounter();
            let monthlyClicks = parseInt(localStorage.getItem(monthKey) || 0);
            
            // Actualizar el contador en la interfaz
            if (clickCounter) {
                clickCounter.textContent = 'Clicks este mes: ' + monthlyClicks;
            }
            
            // Manejar clics en el botón de WhatsApp
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', function(e) {
                    // Prevenir navegación inmediata para poder contar el clic
                    e.preventDefault();
                    
                    // Incrementar contador
                    monthlyClicks++;
                    
                    // Actualizar en localStorage
                    localStorage.setItem(monthKey, monthlyClicks);
                    
                    // Actualizar UI
                    if (clickCounter) {
                        clickCounter.textContent = 'Clicks este mes: ' + monthlyClicks;
                    }
                    
                    // Efecto visual
                    this.classList.add('clicked');
                    
                    // Guardar la URL para redirigir
                    const whatsappURL = this.href;
                    
                    // Redirigir después de un breve retraso
                    setTimeout(() => {
                        this.classList.remove('clicked');
                        window.location.href = whatsappURL;
                    }, 300);
                });
            } else {
                console.error('El botón de WhatsApp no se encontró en el DOM');
            }
            
            // Verificar el cambio de mes cada vez que se carga la página
            checkAndResetMonthlyCounter();
            
            // Para depuración - comprobar que los contadores están funcionando
            console.log('Estado actual de contador mensual:', {
                currentMonthKey: monthKey,
                clicks: monthlyClicks
            });
        });
