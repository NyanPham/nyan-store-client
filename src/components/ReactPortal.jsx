import { createPortal } from 'react-dom'

function ReactPortal({ children, containerId }) {
    let container = document.getElementById(containerId)
    if (!container) {
        container = createWrapperAndAppendToBody(containerId)
    }

    return createPortal(children, container)
}

function createWrapperAndAppendToBody(containerId) {
    const container = document.createElement('div')
    container.setAttribute('id', containerId)
    document.body.appendChild(container)

    return container
}

export default ReactPortal
