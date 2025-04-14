  // Código para contar los clics en el botón de WhatsApp y mostrar estadísticas mensuales
  document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    const registerBtn = document.getElementById('registerBtn');
    const clickCounter = document.getElementById('clickCounter'); // Puede ser null si se elimina del HTML
    
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
        
        // Actualizar la clave del mes actual
        localStorage.setItem('lastMonthKey', currentMonthKey);
        return currentMonthKey;
    }
    
    // Inicializar/verificar contador mensual
    const monthKey = checkAndResetMonthlyCounter();
    let monthlyClicks = parseInt(localStorage.getItem(monthKey) || 0);
    
    // Actualizar el contador en la interfaz si existe el elemento
    if (clickCounter) {
        clickCounter.textContent = 'Clicks este mes: ' + monthlyClicks;
    }
    
    // Manejar clics en el botón de WhatsApp
    whatsappBtn.addEventListener('click', function(e) {
        // Prevenir navegación inmediata para poder contar el clic
        e.preventDefault();
        
        // Incrementar contador
        monthlyClicks++;
        
        // Actualizar UI si existe el elemento
        if (clickCounter) {
            clickCounter.textContent = 'Clicks este mes: ' + monthlyClicks;
        }
        
        // Guardar en localStorage (esto siempre se ejecuta, independientemente de la UI)
        localStorage.setItem(monthKey, monthlyClicks);
        
        // Efecto visual
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
            
            // Redirigir a WhatsApp después de un breve retraso
            window.location.href = this.href;
        }, 300);
    });
    
    // Verificar el cambio de mes cada vez que se carga la página
    checkAndResetMonthlyCounter();
    
    // Para depuración - comprobar que los contadores están funcionando
    console.log('Estado actual de contador mensual:', {
        currentMonthKey: monthKey,
        clicks: monthlyClicks
    });
});