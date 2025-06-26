const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const nuevoAlumno = reactive({ rut: '', nombre: '', edad: '', correo: '', asignatura: '', profesor: '' });
        const alumnos = reactive(JSON.parse(localStorage.getItem('alumnos') || '[]'));
        const errors = reactive({});
        function guardarAlumnos() {
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
        }

        function agregarAlumno() {

            // let errors = {}

            if (nuevoAlumno.nombre === '' && nuevoAlumno.nombre.lenght == 0) {
                errors.nombre = 'El nombre es obligatorio.';
            }

            if (nuevoAlumno.rut === '' && nuevoAlumno.rut.split("-").length != 2 && !["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "k", "K"].nuevoAlumno.rut.split("-")[1]) {
                errors.rut = 'El RUT es obligatorio y debe tener un formato válido (123456789-0).';
            }

            if (nuevoAlumno.edad === '' || isNaN(nuevoAlumno.edad) || nuevoAlumno.edad < 0) {
                errors.edad = 'La edad es obligatoria y debe ser un número positivo.';
            }

            if (nuevoAlumno.correo === '' || !/\S+@\S+\.\S+/.test(nuevoAlumno.correo)) {
                errors.correo = 'El correo es obligatorio y debe tener un formato válido.';
            }

            if (nuevoAlumno.asignatura === '') {
                errors.asignatura = 'La asignatura es obligatoria.';
            }

            if (nuevoAlumno.profesor === '') {
                errors.profesor = 'El profesor es obligatorio.';
            }



            if (Object.keys(errors).length > 0) {
                alert(`Errores:\n${Object.values(errors).join('\n')}`);
                return;
            }



            alumno.push({
                rut: nuevoAlumno.rut, nombre: nuevoAlumno.nombre, edad: nuevoAlumno.edad, correo: nuevoAlumno.correo, asignatura: nuevoAlumno.asignatura, profesor: nuevoAlumno.profesor,
            });
            nuevoAlumno.nombre = '';
            nuevoAlumno.rut = '';
            nuevoAlumno.edad = '';
            nuevoAlumno.correo = '';
            nuevoAlumno.asignatura = '';
            nuevoAlumno.profesor = '';
            guardarAlumnos();
        }



        // function editarLibro(indice) {
        //     const libro = libros[indice];
        //     nuevoLibro.nombre = libro.nombre;
        //     nuevoLibro.categoria = libro.categoria;
        //     nuevoLibro.autor = libro.autor;
        //     nuevoLibro.precio = libro.precio;
        //     nuevoLibro.fecha_publicacion = libro.fecha_publicacion;
        //     nuevoLibro.editorial = libro.editorial;

        //     // Eliminar el libro del array para evitar duplicados al agregarlo de nuevo
        //     libros.splice(indice, 1);
        //     guardarLibros();
        // }


        // function comprarLibro(indice) {
        //     const libroComprado = libros[indice];
        //     const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        //     carrito.push(libroComprado);
        //     localStorage.setItem('carrito', JSON.stringify(carrito));
        //     libros.splice(indice, 1);
        //     guardarLibros();
        // }

        // const categorias = ref([]);

        // onMounted(() => {
        //     categorias.value = JSON.parse(localStorage.getItem('categorias') || '[]');
        // });

        return {
            nuevoAlumno,
            alumnos,
            errors,
            agregarAlumno,
        };

    }
}).mount('#app');
