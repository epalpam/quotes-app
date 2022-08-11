
const deleteBtn = document.querySelectorAll('.fa-trash-can');
const likeBtn = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteBtn).forEach( (element) => {
    element.addEventListener('click', deleteItem);
});

Array.from(likeBtn).forEach( (element) => {
    element.addEventListener('click', likeItem);
});

async function deleteItem() {
    const itemContent = this.parentNode.parentNode.childNodes[1].childNodes[3].textContent;
    console.log(itemContent);

    try {
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemContent
            })
          });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(error);
    }
}


async function likeItem() {
    const likeText = this.parentNode.parentNode.childNodes[1].childNodes[3].textContent;
    console.log(likeText);

    try {
        const response = await fetch('likeItem', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': likeText
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();

    } catch(error) {
        console.log(error);
    }
}