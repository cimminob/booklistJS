class Book {
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI {
    addBookToList(book) {
        const list=document.getElementById('book-list');
        //create tr element
        const row=document.createElement('tr');
        // insert tds(cols) in tr
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);
    }
    showAlert(msg, className){
        //create div
        const div=document.createElement('div');
        //Add classes
        div.className=`alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(msg));
        //Get parent
        const container=document.querySelector('.container');
        //Get form
        const form=document.querySelector('#book-form');
        //Insert Alert
        container.insertBefore(div, form);
    
        //dissappear after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);    
    }
    deleteBook(target){
        if(target.className==='delete') {
            target.parentElement.parentElement.remove();
        }

    }
    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
}

//Local Storage Class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null) {
            books=[];
        } else {
            books=JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach( book=> {  
            const ui = new UI;

            //add book to ui
            ui.addBookToList(book);
        });

    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        
        books.forEach((book,index)=>{
            if(book.isbn===isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    //get form values
    const title=document.getElementById('title').value,
          author=document.getElementById('author').value,
          isbn=document.getElementById('isbn').value;

    //instantiate book      
    const book = new Book(title, author, isbn);

    //instantiate UI    
    const ui = new UI();

    //validate UI
    if(title === ''||author===''||isbn===''){
        //error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {

        //Add book to list
        ui.addBookToList(book);
        Store.addBook(book);

        //show success
        ui.showAlert('book added!', 'success');

        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener(
    'click', (e)=> {

        //instantiate UI
        const ui=new UI();

        //delete
        ui.deleteBook(e.target);


        //Remove from LS
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        //show message
        ui.showAlert('book removed!','success');

        e.preventDefault();
    }
)