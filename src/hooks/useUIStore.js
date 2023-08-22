
export const useUIStore = () => {

    const toggleTheme = (e) => {
        e.preventDefault()
        const elementHtml = document.querySelector('html')

        if (elementHtml.getAttribute('data-bs-theme') === 'light') {
            elementHtml.setAttribute('data-bs-theme', 'dark')
        } else {
            elementHtml.setAttribute('data-bs-theme', 'light')
        }
    }

    return {
        //* PROPIEDADES

        //* METODOS
        toggleTheme
    }
}