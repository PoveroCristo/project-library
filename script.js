//Global values
let functionButtons = document.getElementById("function_base").getElementsByTagName("img")
let library = []
let divTable = document.getElementById("library")
let book;


//Add, Edit and Delete buttons animation
functionButtons[1].addEventListener("mouseover", function(event) {
    event.target.src = "add_button_animation.gif";
})
functionButtons[1].addEventListener("mouseout", function(event) {
    event.target.src = "add_button_static.png";
})

functionButtons[2].addEventListener("mouseover", function(event) {
    event.target.src = "edit_button_animation.gif";
})
functionButtons[2].addEventListener("mouseout", function(event) {
    event.target.src = "edit_button_static.png";
})

functionButtons[3].addEventListener("mouseover", function(event) {
    event.target.src = "delete_button_animation.gif";
})
functionButtons[3].addEventListener("mouseout", function(event) {
    event.target.src = "delete_button_static.png";
})

//Book Object template
function Book(title, author, genre, year, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
    this.read = read;
    this.rendered = false;
} 

//ADD FORM
//Gets info on book from user input
function addBookToLibrary() {
    //Dynamically generated UI for adding books to Library
    let compassingForm = document.getElementById("addform");
    let divForm = document.createElement("div");
    compassingForm.appendChild(divForm);
    divForm.style.position = "relative";
    divForm.style.width = "1500px";
    let formBackground = document.createElement("img");
    formBackground.src = "addform.png"
    divForm.appendChild(formBackground)

    let bookForm = document.createElement("form");

    let titleForm = document.createElement("input");
    let titleText = document.createElement("h3");
    titleText.innerHTML = "Title";
    titleText.style.left = "20px";
    titleForm.style.left = "20px";
    titleForm.style.width = "550px";

    let authorForm = document.createElement("input");
    let authorText = document.createElement("h3");
    authorText.innerHTML = "Author";
    authorText.style.left = "600px"
    authorForm.style.left = "600px"
    authorForm.style.width = "260px";

    let genreForm = document.createElement("input");
    let genreText = document.createElement("h3");
    genreText.innerHTML = "Genre";
    genreText.style.left = "885px"
    genreForm.style.left = "885px"
    genreForm.style.width = "200px";

    let yearForm = document.createElement("input");
    let yearText = document.createElement("h3");
    yearText.innerHTML = "Year";
    yearText.style.left = "1115px"
    yearForm.style.left = "1115px"
    yearForm.style.width = "70px"

    let readForm = document.createElement("input");
    readForm.setAttribute("type", "checkbox")
    let checkText = document.createElement("h3");
    checkText.innerHTML = "Read?"
    checkText.style.left = "1230px";
    readForm.style.left = "1230px";

    let labels = [titleText, authorText, genreText, yearText, checkText]
    let forms = [titleForm, authorForm, genreForm, yearForm, readForm]
    for (let i = 0; i < forms.length; i++) {
        bookForm.appendChild(forms[i])
        bookForm.appendChild(labels[i])
        labels[i].style.color = "white";
        labels[i].style.position = "absolute";
        forms[i].style.position ="absolute";
        labels[i].style.bottom = "50px";
        forms[i].style.bottom = "30px";
    }
    divForm.appendChild(bookForm);

    let buttonAdd = document.createElement("img");
    buttonAdd.src = "add_button_static.png";
    buttonAdd.style.bottom = "30px";
    buttonAdd.style.position = "absolute";
    buttonAdd.style.left = "1370px";
    buttonAdd.style.width = "100px";
    buttonAdd.style.height = "50px";
    divForm.appendChild(buttonAdd)
    buttonAdd.addEventListener("click", () => {
        
        book = new Book(titleForm.value, authorForm.value, genreForm.value, yearForm.value, readForm.checked)
        library.push(book)
        loopBooks(book);
        compassingForm.removeChild(divForm);
    })
    buttonAdd.addEventListener("mouseover", function(event) {
        event.target.src = "add_button_animation.gif";
    })
    buttonAdd.addEventListener("mouseout", function(event) {
        event.target.src = "add_button_static.png";
    })
}

function loopBooks(book) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].rendered == false) {
            library[i].rendered = true;
            let divLibrary = document.createElement("div");
            divLibrary.id = library[i].title;
            divTable.appendChild(divLibrary);
            divLibrary.style.position = "relative";
            divLibrary.style.width = "1210px";
            divLibrary.style.padding = "10px 0px"


            //Read status of the book and background image for the row.
            //Both change color according to the book's read status(read/not read)
            let baseImageRow = document.createElement("img");
            let readStatusRow = document.createElement("img");        
            if ( library[i].read == false) {
                
                baseImageRow.src = "row_library_unread_book.png";
                readStatusRow.src = "read_status_no.png"
            } else if (library[i].read  == true) {
                baseImageRow.classList.add("read");
                baseImageRow.src= "row_library_read_book.png";
                readStatusRow.classList.add("read");
                readStatusRow.src = "read_status_yes.png"
            }
            readStatusRow.style.position = "absolute";
            readStatusRow.style.right = "-290px";
            readStatusRow.style.height = "100px"
            readStatusRow.style.width = "50px";
            divLibrary.appendChild(readStatusRow); 
            divLibrary.appendChild(baseImageRow);
            readStatusRow.addEventListener("click", () => {
                baseImageRow.classList.toggle("read")
                readStatusRow.classList.toggle("read")
                if (baseImageRow.classList.contains("read")) {
                    baseImageRow.src = "row_library_read_book.png";
                    readStatusRow.src = "read_status_yes.png";
                } else {
                    baseImageRow.src = "row_library_unread_book.png";
                    readStatusRow.src = "read_status_no.png";
                }
            })

            //Book infos
            let bookTitleCell = document.createElement("h3")
            if (library[i].title.length > 24) {
                bookTitleCell.innerHTML = library[i].title.substring(0,24) + "...";
            } else {
                bookTitleCell.innerHTML = library[i].title;
            }
            bookTitleCell.classList.add("title")
            bookTitleCell.classList.add("font_format")
            bookTitleCell.style.left = "20px";     
            divLibrary.appendChild(bookTitleCell)

            let titleToolTip = document.createElement("h3");
            titleToolTip.innerHTML = library[i].title;
            titleToolTip.style.left = "20px";
            titleToolTip.classList.add("tooltip");
            divLibrary.appendChild(titleToolTip);

            bookTitleCell.addEventListener("mouseover", () => {
                titleToolTip.style.visibility = "initial";
            })
            bookTitleCell.addEventListener("mouseout", () => {
                titleToolTip.style.visibility = "hidden";
            })


            let bookAuthorCell = document.createElement("h3")
            if (library[i].author.length > 11) {
                bookAuthorCell.innerHTML = library[i].author.substring(0,11) + "...";
            } else {
                bookAuthorCell.innerHTML = library[i].author;
            }
            bookAuthorCell.classList.add("title")
            bookAuthorCell.classList.add("font_format")
            bookAuthorCell.style.left = "600px";
            divLibrary.appendChild(bookAuthorCell);

            let authorToolTip = document.createElement("h3");
            authorToolTip.innerHTML = library[i].author;
            authorToolTip.style.left = "600px";
            authorToolTip.classList.add("tooltip");
            divLibrary.appendChild(authorToolTip);

            bookAuthorCell.addEventListener("mouseover", () => {
                authorToolTip.style.visibility = "initial";
            })
            bookAuthorCell.addEventListener("mouseout", () => {
                authorToolTip.style.visibility = "hidden";
            })

            let bookGenreCell = document.createElement("h3");
            if (library[i].genre.length > 7) {
                bookGenreCell.innerHTML = library[i].genre.substring(0,7) + "...";
            } else {
                bookGenreCell.innerHTML = library[i].genre;
            }
            bookGenreCell.classList.add("title")
            bookGenreCell.classList.add("font_format")            
            bookGenreCell.style.left = "885px";
            divLibrary.appendChild(bookGenreCell);

            let genreTooltip = document.createElement("h3");
            genreTooltip.innerHTML = library[i].genre;
            genreTooltip.style.left = "885px";
            genreTooltip.classList.add("tooltip");
            divLibrary.appendChild(genreTooltip);

            bookGenreCell.addEventListener("mouseover", () => {
                genreTooltip.style.visibility = "initial";
            })
            bookGenreCell.addEventListener("mouseout", () => {
                genreTooltip.style.visibility = "hidden";
            })

            let bookYearCell = document.createElement("h3")
            if (library[i].year.length > 4) {
                bookYearCell.innerHTML = library[i].year.substring(0,2) + "...";
            } else {
                bookYearCell.innerHTML = library[i].year;
            }
            bookYearCell.classList.add("title")
            bookYearCell.classList.add("font_format")            
            bookYearCell.style.left = "1115px";
            divLibrary.appendChild(bookYearCell);

            let yearTooltip = document.createElement("h3");
            yearTooltip.innerHTML = library[i].year;
            yearTooltip.style.left = "1115px";
            yearTooltip.classList.add("tooltip");
            divLibrary.appendChild(yearTooltip);

            bookYearCell.addEventListener("mouseover", () => {
                yearTooltip.style.visibility = "initial";
            })
            bookYearCell.addEventListener("mouseout", () => {
                yearTooltip.style.visibility = "hidden";
            })

            let editRow = document.createElement("img");
            editRow.src = "edit_row_button.png"
            editRow.style.position = "absolute";
            editRow.style.right = "-110px";
            editRow.style.height = "100px"
            editRow.style.width = "100px";
            divLibrary.appendChild(editRow);
            editRow.addEventListener("click", () => {
                let edit = prompt("What would you like to edit?", "")
                switch(edit) {
                    case "title":
                    let newTitle = prompt("Choose a new title")
                    if (newTitle.length > 20) {
                        bookTitleCell.innerHTML = newTitle(0,21) + "..."
                    } else {
                    bookTitleCell.innerHTML = newTitle;
                    }
                    divLibrary.id = newTitle;
                    titleToolTip.innerHTML = newTitle;                    
                    break;
                case "author":
                    let newAuthor = prompt("Choose a new author")
                    if (newAuthor.length > 11) {
                        bookAuthorCell.innerHTML = newAuthor(0,11) + "..."
                    } else {
                        bookAuthorCell.innerHTML = newAuthor;
                    }
                    authorToolTip.innerHTML = newAuthor;
                    break;
                case "genre":
                    let newGenre = prompt("Choose a new genre");
                    if (newGenre.length > 7) {
                        bookGenreCell.innerHTML = newGenre(0,7) + "..."
                    } else {
                        bookGenreCell.innerHTML = newGenre;
                    }
                    genreTooltip.innerHTML = newGenre;
                    break;
                case "year":
                    let newYear = prompt("Choose a new year");
                    if (newYear.length > 4) {
                        bookYearCell.innerHTML = newYear(0,2) + "..."
                    } else {
                        bookYearCell.innerHTML = newYear;
                    }
                    yearTooltip.innerHTML = newYear;
                    break;
                default:
                    alert("Invalid choice.")
                    break;

                }
            })
            editRow.addEventListener("mouseover", () => {
                editRow.src = "edit_row_button.gif"
            })
            editRow.addEventListener("mouseout", () => {
                editRow.src = "edit_row_button.png"
            })

            
            //Delete button on the side of the book's row
            let deleteRow = document.createElement("img");
            deleteRow.src = "delete_row_button.png"
            deleteRow.style.position = "absolute";
            deleteRow.style.right = "-220px";
            deleteRow.style.height = "100px"
            deleteRow.style.width = "100px";
            divLibrary.appendChild(deleteRow);
            deleteRow.addEventListener("click", () => {
                divTable.removeChild(divLibrary)
            })
            deleteRow.addEventListener("mouseover", () => {
                deleteRow.src = "delete_row_button.gif"
            })
            deleteRow.addEventListener("mouseout", () => {
                deleteRow.src = "delete_row_button.png"
            })

        }
    }
}

function deleteEntry() {
    let encompassingTable = document.getElementById("library")
    let bookInfo = prompt("Which book would you like to delete?", "")
    let divToDelete = document.getElementById(bookInfo)
    if (divToDelete != null) {
        encompassingTable.removeChild(divToDelete)
    } else {
        alert("The book does not exist.")
        return
    }
}

function editEntry() {
    let bookInfo = prompt("Which book would you like to edit?", "");
    let divToEdit = document.getElementById(bookInfo)
    if (divToEdit != null) {
        let edit = prompt("What would you like to edit?", "")
                switch(edit) {
                    case "title":
                    let newTitle = prompt("Choose a new title")
                    if (newTitle.length > 20) {
                        divToEdit.children[2].innerHTML = newTitle(0,21) + "..."
                    } else {
                    divToEdit.children[2].innerHTML = newTitle;
                    }
                    divToEdit.id = newTitle;
                    divToEdit.children[3].innerHTML = newTitle;                    
                    break;
                case "author":
                    let newAuthor = prompt("Choose a new author")
                    if (newAuthor.length > 20) {
                        divToEdit.children[4].innerHTML = newAuthor(0,11) + "..."
                    } else {
                    divToEdit.children[4].innerHTML = newAuthor;
                    }
                    divToEdit.children[5].innerHTML = newAuthor;                    
                    break;                    
                case "genre":
                    let newGenre = prompt("Choose a new genre");
                    if (newGenre.length > 7) {
                        divToEdit.children[6].innerHTML = newGenre(0,7) + "..."
                    } else {
                    divToEdit.children[6].innerHTML = newGenre;
                    }
                    divToEdit.children[7].innerHTML = newGenre;                    
                    break;   
                case "year":
                    let newYear = prompt("Choose a new year");
                    if (newYear.length > 20) {
                        divToEdit.children[8].innerHTML = newYear(0,2) + "..."
                    } else {
                    divToEdit.children[8].innerHTML = newYear;
                    }
                    divToEdit.children[9].innerHTML = newYear;                    
                    break;   
                default:
                    alert("Invalid choice.")
                    break;

                }
    }
}

//Header buttons event listeners
functionButtons[1].addEventListener("click", addBookToLibrary);
functionButtons[2].addEventListener("click", editEntry)
functionButtons[3].addEventListener("click", deleteEntry);





