const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const nuevoProfesor = reactive({ nombre: '', correo: '' });
        const profesores = reactive(JSON.parse(localStorage.getItem('profesores') || '[]'));
        const errors = reactive({});
        function guardarProfesores() {
            localStorage.setItem('profesores', JSON.stringify(profesores));
        }

        function agregarProfesor() {

            if (nuevoProfesor.nombre === '' && nuevoProfesor.nombre.length == 0) {
                errors.nombre = 'El nombre es obligatorio';
            }

            if (!/^[a-zA-Z\s]+$/.test(nuevoProfesor.nombre)) {
                errors.nombre = 'El nombre solo debe contener letras.';
            }

            if (nuevoProfesor.correo === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(nuevoProfesor.correo)) {
                errors.correo = 'El correo es obligatorio y debe tener un formato válido.';
            }

            if (Object.keys(errors).length > 0) {
                // alert(`Errores:\n${Object.values(errors).join('\n')}`);
                return;
            }

            profesores.push({
                nombre: nuevoProfesor.nombre, correo: nuevoProfesor.correo
            });
            nuevoProfesor.nombre = '';
            nuevoProfesor.correo = '';
            guardarProfesores();
        }

        return {
            nuevoProfesor,
            profesores,
            errors,
            agregarProfesor,
        };

    }
}).mount('#app');
