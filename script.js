let store = Redux.createStore(reducer);
let input = document.querySelector('input');
let list = document.querySelector('.list');

function handleTodo(event) {
  if (event.keyCode === 13 && event.target.value) {
    store.dispatch({
      type: 'add',
      todo: event.target.value,
      isCompleted: false,
    });
    event.target.value = '';
  }
}

function createUI(todos) {
  list.innerHTML = '';1
  todos.forEach((elm, index) => {
    let li = document.createElement('li');
    li.classList.add(
      'flex',
      'justify-between',
      'my-2',
      'items-center',
      'text-xl',
      'border',
      "border-dashed",
      'py-3',
      'px-2'
    );
    let h2 = document.createElement('h2');
    h2.innerText = elm.todo;
    h2.style.color = elm.isCompleted ? 'green' : 'teal';
    h2.style.textTransform = 'capitalize';
    let radio = document.createElement('input');
    radio.type = 'checkbox';
    radio.checked = elm.isCompleted;
    radio.addEventListener('click', () => {
      store.dispatch({
        type: 'iscompleted',
        isCompleted: !elm.isCompleted,
        id: index,
      });
    });
    let close = document.createElement('span');
    close.innerText = '❌';
    close.classList.add('cursor-pointer');
    close.addEventListener('click', () => {
      store.dispatch({ type: 'delete', id: index });
    });
    li.append(radio, h2, close);
    list.append(li);
  });
}

store.subscribe(() => {
  let todos = store.getState();
  createUI(todos);
});

input.addEventListener('keyup', handleTodo);

function reducer(state = [], action) {
  switch (action.type) {
    case 'add':
      return state.concat({
        todo: action.todo,
        isCompleted: action.isCompleted,
      });
      break;
    case 'delete':
      return state.filter((elm, index) => index !== action.id);
      break;
    case 'iscompleted':
      return state.filter((elm, index) => {
        if (action.id === index) {
          elm.isCompleted = action.isCompleted;
        }
        return elm;
      });
      break;
    default:
      return state;
  }
}
