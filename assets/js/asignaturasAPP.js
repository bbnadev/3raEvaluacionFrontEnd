const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const nuevaAsignatura = reactive({ nombre: '', sede: '' });
        const asignaturas = reactive(JSON.parse(localStorage.getItem('asignaturas') || '[]'));
        const errors = reactive({});
        function guardarAsignaturas() {
            localStorage.setItem('asignaturas', JSON.stringify(asignaturas));
        }

        function agregarAsignatura() {

            if (nuevaAsignatura.nombre === '' && nuevaAsignatura.nombre.length == 0) {
                errors.nombre = 'El nombre es obligatorio .';
            }

            if (!/^[a-zA-Z\s]+$/.test(nuevaAsignatura.nombre)) {
                errors.nombre = 'El nombre solo debe contener letras.';
            }

            if (nuevaAsignatura.sede === '') {
                errors.asignatura = 'La sede es obligatoria.';
            }

            if (!/^[a-zA-Z\s]+$/.test(nuevaAsignatura.sede)) {
                errors.sede = 'La sede solo debe contener letras.';
            }

            if (Object.keys(errors).length > 0) {
                // alert(`Errores:\n${Object.values(errors).join('\n')}`);
                return;
            }

            asignaturas.push({
                nombre: nuevaAsignatura.nombre, sede: nuevaAsignatura.sede
            });
            nuevaAsignatura.nombre = '';
            nuevaAsignatura.sede = '';
            guardarAsignaturas();
        }

        function eliminarAsignatura(indice) {
            asignaturas.splice(indice, 1);
            guardarAsignaturas();
        }



        return {
            nuevaAsignatura,
            asignaturas,
            errors,
            agregarAsignatura,
            eliminarAsignatura
        };

    }
}).mount('#app');
