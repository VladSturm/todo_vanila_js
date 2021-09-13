const TodoList = document.getElementById('list')
const Form = document.getElementById('form')
const input = document.getElementById('newItem')
let tasks

const addItem = ({ item, isLoad }) => {
    const liElement = document.createElement('li')
    const toggleEl = document.createElement('input')
    const removeButton = document.createElement('button')
    const label = document.createElement('label')

    toggleEl.setAttribute('type', 'checkbox')
    toggleEl.id = `${item.id}-input`
    toggleEl.classList.add('list_input')
    label.setAttribute('for', `${item.id}-input`)

    liElement.id = item.id
    label.classList.add('list_label')

    removeButton.classList.add('remove-item')

    if (item.isActive) {
        toggleEl.checked = true
        toggleEl.checked = 'checked'
        toggleEl.setAttribute('checked', '')
        label.classList.add('list_label--active')
        liElement.classList.add('list--active')
    }
    liElement.appendChild(label)
    liElement.appendChild(toggleEl)

    liElement.appendChild(document.createTextNode(item.name))
    liElement.appendChild(removeButton)

    TodoList.appendChild(liElement)

    input.value = ''

    if (!isLoad) {
        tasks.push(item)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

(function () {
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) || []
        tasks && tasks.map(item => addItem({ item, isLoad: true }))
    } catch (error) {
        console.error(error)
    }
}())

const removeItem = (id) => {
    document.getElementById(id).remove()
    tasks = tasks.filter(item => item.id != id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const setActiveItem = (id) => {
    const task = tasks.find(item => item.id === id)
    task.isActive = !task.isActive
    const parent = document.getElementById(id)
    const child = parent.querySelector('input[type="checkbox"]')
    const childLabel = parent.querySelector('label')
    if (task.isActive) {
        child.setAttribute('checked', '')
        child.checked = true
        childLabel.classList.add('list_label--active')
        parent.classList.add('list--active')
    } else {
        child.removeAttribute('checked')
        child.checked = false
        childLabel.classList.remove('list_label--active')
        parent.classList.remove('list--active')

    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

Form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = input.value
    if (value) {
        const item = {
            id: `${(+new Date).toString(16)}`,
            name: value,
            isActive: false
        }
        addItem({ item, isLoad: false })
    }
})

TodoList.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.localName === 'label') {
        setActiveItem(e.target.parentElement.id)
    }

    if (e.target.className === 'remove-item') {
        const id = e.target.parentElement.id
        removeItem(id)
    }
})