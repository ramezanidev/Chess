// DOM obj
var block = document.querySelectorAll('.block');
var cover = document.querySelector('.cover');
// vars
var actived = [];
var BlackEl = [];
var index, indexrow, parentEL, parentParentEL;
var white = false;

/* 
        write by reza ramezani
            github => ramezanidev
                email => reza.dev@yahoo.com
                    tel => 09916223724
*/

// animation
block.forEach(el => {
    el.addEventListener('click', select);
    el.addEventListener('mousemove', (e) => {
        if (!e.currentTarget.innerHTML) {
            let width = parseInt(document.defaultView.getComputedStyle(el).width) / 2;
            let height = parseInt(document.defaultView.getComputedStyle(el).height) / 2;
            var y = 0;
            var x = 0;
            if (0 < e.offsetX < width) { y = (60 - ((e.offsetX * 30) / width)) - 30 };
            if (e.offsetX > width && e.offsetX > 0) { y = (-(e.offsetX * 30) / width) + 30 };
            if (0 < e.offsetY < height) { x = -(60 - ((e.offsetY * 30) / height)) + 30 };
            if (e.offsetY > height && e.offsetY > 0) { x = ((e.offsetY * 30) / height) - 30 };
            el.style.transform = 'perspective(300px) scale3d(1, 1, 1) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
        }
    })
    el.addEventListener("mouseout", () => {
        el.style.transform = 'perspective(300px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)';
    })
})
// func select el
function select(e) {
    //set var
    parentEL = e.currentTarget.parentNode;
    parentParentEL = parentEL.parentNode;
    //reset class el
    block.forEach(i => { i.classList.remove('select') });
    block.forEach(i => { i.classList.remove('Active') });
    block.forEach(i => { i.classList.remove('Delete') });
    e.currentTarget.classList.add('select');
    try {
        var Team = e.currentTarget.querySelector("img").getAttribute('data-Team')
        var type_EL = e.currentTarget.querySelector("img").getAttribute('class')
    } catch (error) { }
    if (e.currentTarget.innerHTML && !(Team === e.currentTarget.children[0].getAttribute('data-team'))) {
        block.forEach(el => {
            el.removeEventListener('click', select)
        })
    }
    if(Team==='White'&&white){
        slectTeam(e)
    }else if(Team==='Black'&&!(white)){
        slectTeam(e)
    }
    // func team select
    function slectTeam(e){
        // set index el
        for (let ii = 0; ii < parentEL.children.length; ii++) {
            const item = parentEL.children[ii];
            if (item === e.currentTarget) {
                index = ii
            }
        }
        //set parent el index
        for (let ee = 0; ee < parentParentEL.children.length; ee++) {
            const item = parentParentEL.children[ee];
            if (item === parentEL) {
                indexrow = ee
            }
        }
        //reset arrey
        actived = []
        BlackEl = []
        // switch select action
        switch (type_EL) {
            case 'Soldier': {
                Soldier(e)
                break;
            } case 'Castle': {
                Castle(e)
                break;
            } case 'Elephant': {
                Elephant(e)
                break;
            } case 'Horse': {
                Horse(e)
                break;
            } case 'Minister': {
                Castle(e)
                Elephant(e)
                break;
            } case 'king': {
                king(e)
                break;
            }
        }
        // set events for el
        if (BlackEl.length >= 1 || actived.length >= 1) {
            block.forEach(w => {
                w.removeEventListener('click', replaceItem)
                w.removeEventListener('click', appendItem)
                w.removeEventListener('click', select)
            })
            BlackEl.forEach(elem => {
                elem.addEventListener('click', replaceItem)
            })
            actived.forEach(elem => {
                elem.addEventListener('click', appendItem)
            })
            //set select el in end arreys
            actived[actived.length] = e.currentTarget.children[0];
            BlackEl[BlackEl.length] = e.currentTarget.children[0];
        }
        // add dbl event
        e.currentTarget.addEventListener('dblclick', () => {
            resetEvents()
        })
    }
}

// soldier func
function Soldier(e) {
    if (parentEL.getAttribute('data-row') === '7'&& e.currentTarget.children[0].getAttribute('class')==='Soldier' && e.currentTarget.children[0].getAttribute('data-team')==='White') {
        if (!parentEL.previousElementSibling.children[index].innerHTML) {
            parentEL.previousElementSibling.children[index].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.children[index];
            if (!parentEL.previousElementSibling.previousElementSibling.children[index].innerHTML) {
                parentEL.previousElementSibling.previousElementSibling.children[index].classList.add('Active');
                actived[actived.length] = parentEL.previousElementSibling.previousElementSibling.children[index];
            }
        }
    }
    if (parentEL.getAttribute('data-row') === '2'&& e.currentTarget.children[0].getAttribute('class')==='Soldier' && e.currentTarget.children[0].getAttribute('data-team')==='Black') {
        if (!parentEL.nextElementSibling.children[index].innerHTML) {
            parentEL.nextElementSibling.children[index].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.children[index];
            if (!parentEL.nextElementSibling.nextElementSibling.children[index].innerHTML) {
                parentEL.nextElementSibling.nextElementSibling.children[index].classList.add('Active');
                actived[actived.length] = parentEL.nextElementSibling.nextElementSibling.children[index];
            }
        }
        
    }
        try {
            if (!parentEL.previousElementSibling.children[index].innerHTML) {
                parentEL.previousElementSibling.children[index].classList.add('Active');
                actived[actived.length] = parentEL.previousElementSibling.children[index];
            }
        } catch (error) { }
        try {
            if (!parentEL.nextElementSibling.children[index].innerHTML) {
                parentEL.nextElementSibling.children[index].classList.add('Active');
                actived[actived.length] = parentEL.nextElementSibling.children[index];
            }
        } catch (error) { }

        try {
            if (!(parentEL.previousElementSibling.children[index - 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentEL.previousElementSibling.children[index - 1].classList.add('Delete');
                BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index - 1];
            }
        } catch (error) { }
        try {
            if (!(parentEL.previousElementSibling.children[index + 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentEL.previousElementSibling.children[index + 1].classList.add('Delete');
                BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index + 1];
            }
        } catch (error) { }
        try {
            if (!(parentEL.nextElementSibling.children[index + 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentEL.nextElementSibling.children[index + 1].classList.add('Delete');
                BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index + 1];
            }
        } catch (error) { }
        try {
            if (!(parentEL.nextElementSibling.children[index - 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentEL.nextElementSibling.children[index - 1].classList.add('Delete');
                BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index - 1];
            }
        } catch (error) { }
}

// king func
function king(e){
    try {
        if (!parentEL.previousElementSibling.children[index - 1].innerHTML) {
            parentEL.previousElementSibling.children[index - 1].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.children[index - 1];
        } else if (!(parentEL.previousElementSibling.children[index - 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.children[index - 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index - 1];
        }
    } catch (error) { }

    try {
        if (!e.currentTarget.previousElementSibling.innerHTML) {
            e.currentTarget.previousElementSibling.classList.add('Active');
            actived[actived.length] = e.currentTarget.previousElementSibling;
        } else if (!(e.currentTarget.previousElementSibling.children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            e.currentTarget.previousElementSibling.classList.add('Delete');
            BlackEl[BlackEl.length] = e.currentTarget.previousElementSibling;
        }
    } catch (error) { }

    try {
        if (!e.currentTarget.nextElementSibling.innerHTML) {
            e.currentTarget.nextElementSibling.classList.add('Active');
            actived[actived.length] = e.currentTarget.nextElementSibling;
        } else if (!(e.currentTarget.nextElementSibling.children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            e.currentTarget.nextElementSibling.classList.add('Delete');
            BlackEl[BlackEl.length] = e.currentTarget.nextElementSibling;
        }
    } catch (error) { }

    try {
        if (!parentEL.previousElementSibling.children[index + 1].innerHTML) {
            parentEL.previousElementSibling.children[index + 1].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.children[index + 1];
        } else if (!(parentEL.previousElementSibling.children[index + 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.children[index + 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index + 1];
        }
    } catch (error) { }

    try {
        if (!parentEL.previousElementSibling.children[index].innerHTML) {
            parentEL.previousElementSibling.children[index].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.children[index];
        } else if (!(parentEL.previousElementSibling.children[index].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.children[index].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.children[index - 1].innerHTML) {
            parentEL.nextElementSibling.children[index - 1].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.children[index - 1];
        } else if (!(parentEL.nextElementSibling.children[index - 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.children[index - 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index - 1];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.children[index + 1].innerHTML) {
            parentEL.nextElementSibling.children[index + 1].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.children[index + 1];
        } else if (!(parentEL.nextElementSibling.children[index + 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.children[index + 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index + 1];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.children[index].innerHTML) {
            parentEL.nextElementSibling.children[index].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.children[index];
        } else if (!(parentEL.nextElementSibling.children[index].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.children[index].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index];
        }
    } catch (error) { }
}

// Castle func
function Castle(e) {
    for (let it = indexrow; it < 8; it++) {
        if (!parentParentEL.children[it].children[index].innerHTML) {
            parentParentEL.children[it].children[index].classList.add('Active');
            actived[actived.length] = parentParentEL.children[it].children[index];
        } else if (!(parentParentEL.children[it].children[index].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentParentEL.children[it].children[index].classList.add('Delete');
            BlackEl[BlackEl.length] = parentParentEL.children[it].children[index];
            it = 8;
            break;

        } else if (parentParentEL.children[it].children[index].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
            if (!(parentParentEL.children[it].children[index] === e.currentTarget)) {
                it = 8;
                break;
            }
        }
    }

    for (let it = index; it < 8; it++) {
        if (!parentEL.children[it].innerHTML) {
            parentEL.children[it].classList.add('Active');
            actived[actived.length] = parentEL.children[it];
        } else if (!(parentEL.children[it].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.children[it].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.children[it];
            it = 8;
            break;
        }
        else if (parentEL.children[it].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
            if (!(parentEL.children[it] === e.currentTarget)) { it = 8; break }
        }
    }

    for (let it = indexrow; it > -1; it--) {
        if (!parentParentEL.children[it].children[index].innerHTML) {
            parentParentEL.children[it].children[index].classList.add('Active');
            actived[actived.length] = parentParentEL.children[it].children[index];
        } else if (!(parentParentEL.children[it].children[index].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentParentEL.children[it].children[index].classList.add('Delete');
            BlackEl[BlackEl.length] = parentParentEL.children[it].children[index];
            it = -1;
            break;
        }
        else if (parentParentEL.children[it].children[index].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
            if (!(parentParentEL.children[it].children[index] === e.currentTarget)) { it = -1; break }
        }
    }

    for (let it = index; it > -1; it--) {
        if (!parentEL.children[it].innerHTML) {
            parentEL.children[it].classList.add('Active');
            actived[actived.length] = parentEL.children[it];
        } else if (!(parentEL.children[it].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.children[it].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.children[it];
            it = -1;
            break;
        }
        else if (parentEL.children[it].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
            if (!(parentEL.children[it] === e.currentTarget)) { it = -1; break }
        }
    }
}

// Horse func
function Horse(e) {
    try {
        if (!parentEL.previousElementSibling.children[index - 2].innerHTML) {
            parentEL.previousElementSibling.children[index - 2].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.children[index - 2];
        } else if (!(parentEL.previousElementSibling.children[index - 2].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.children[index - 2].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index - 2];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.children[index - 2].innerHTML) {
            parentEL.nextElementSibling.children[index - 2].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.children[index - 2];
        } else if (!(parentEL.nextElementSibling.children[index - 2].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.children[index - 2].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index - 2];
        }
    } catch (error) { }

    try {
        if (!parentEL.previousElementSibling.children[index + 2].innerHTML) {
            parentEL.previousElementSibling.children[index + 2].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.children[index + 2];
        } else if (!(parentEL.previousElementSibling.children[index + 2].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.children[index + 2].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.children[index + 2];
        }
    } catch (error) { }

    try {
        if (!parentEL.previousElementSibling.previousElementSibling.children[index + 1].innerHTML) {
            parentEL.previousElementSibling.previousElementSibling.children[index + 1].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.previousElementSibling.children[index + 1];
        } else if (!(parentEL.previousElementSibling.previousElementSibling.children[index + 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.previousElementSibling.children[index + 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.previousElementSibling.children[index + 1];
        }
    } catch (error) { }

    try {
        if (!parentEL.previousElementSibling.previousElementSibling.children[index - 1].innerHTML) {
            parentEL.previousElementSibling.previousElementSibling.children[index - 1].classList.add('Active');
            actived[actived.length] = parentEL.previousElementSibling.previousElementSibling.children[index - 1];
        } else if (!(parentEL.previousElementSibling.previousElementSibling.children[index - 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.previousElementSibling.previousElementSibling.children[index - 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.previousElementSibling.previousElementSibling.children[index - 1];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.children[index + 2].innerHTML) {
            parentEL.nextElementSibling.children[index + 2].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.children[index + 2];
        } else if (!(parentEL.nextElementSibling.children[index + 2].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.children[index + 2].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.children[index + 2];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.nextElementSibling.children[index + 1].innerHTML) {
            parentEL.nextElementSibling.nextElementSibling.children[index + 1].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.nextElementSibling.children[index + 1];
        } else if (!(parentEL.nextElementSibling.nextElementSibling.children[index + 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.nextElementSibling.children[index + 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.nextElementSibling.children[index + 1];
        }
    } catch (error) { }

    try {
        if (!parentEL.nextElementSibling.nextElementSibling.children[index - 1].innerHTML) {
            parentEL.nextElementSibling.nextElementSibling.children[index - 1].classList.add('Active');
            actived[actived.length] = parentEL.nextElementSibling.nextElementSibling.children[index - 1];
        } else if (!(parentEL.nextElementSibling.nextElementSibling.children[index - 1].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
            parentEL.nextElementSibling.nextElementSibling.children[index - 1].classList.add('Delete');
            BlackEl[BlackEl.length] = parentEL.nextElementSibling.nextElementSibling.children[index - 1];
        }
    } catch (error) { }
}

// Elephant func
function Elephant(e) {
    var b = index - 1
    try {
        for (let i = indexrow; i > -1; (i--, b--)) {
            if (!parentParentEL.children[i - 1].children[b].innerHTML) {
                parentParentEL.children[i - 1].children[b].classList.add('Active');
                actived[actived.length] = parentParentEL.children[i - 1].children[b];
            } else if (!(parentParentEL.children[i - 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentParentEL.children[i - 1].children[b].classList.add('Delete');
                BlackEl[BlackEl.length] = parentParentEL.children[i - 1].children[b];
                it = -1;
                break;
            } else if (parentParentEL.children[i - 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
                if (!(parentParentEL.children[i - 1].children[b] === e.currentTarget)) { i = -1; break }
            }
        }
    } catch (error) { }

    b = index + 1
    try {
        for (let i = indexrow; i > -1; (i--, b++)) {
            if (!parentParentEL.children[i - 1].children[b].innerHTML) {
                parentParentEL.children[i - 1].children[b].classList.add('Active');
                actived[actived.length] = parentParentEL.children[i - 1].children[b];
            } else if (!(parentParentEL.children[i - 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentParentEL.children[i - 1].children[b].classList.add('Delete');
                BlackEl[BlackEl.length] = parentParentEL.children[i - 1].children[b];
                it = -1;
                break;
            } else if (parentParentEL.children[i - 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
                if (!(parentParentEL.children[i - 1].children[b] === e.currentTarget)) { i = -1; break }
            }
        }
    } catch (error) { }

    var b = index - 1
    try {
        for (let i = indexrow; i > -1; (i++, b--)) {
            if (!parentParentEL.children[i + 1].children[b].innerHTML) {
                parentParentEL.children[i + 1].children[b].classList.add('Active');
                actived[actived.length] = parentParentEL.children[i + 1].children[b];
            } else if (!(parentParentEL.children[i + 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentParentEL.children[i + 1].children[b].classList.add('Delete');
                BlackEl[BlackEl.length] = parentParentEL.children[i + 1].children[b];
                it = -1;
                break;
            } else if (parentParentEL.children[i + 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
                if (!(parentParentEL.children[i + 1].children[b] === e.currentTarget)) { i = -1; break }
            }
        }
    } catch (error) { }

    b = index + 1
    try {
        for (let i = indexrow; i > -1; (i++, b++)) {
            if (!parentParentEL.children[i + 1].children[b].innerHTML) {
                parentParentEL.children[i + 1].children[b].classList.add('Active');
                actived[actived.length] = parentParentEL.children[i + 1].children[b];
            } else if (!(parentParentEL.children[i + 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team'))) {
                parentParentEL.children[i + 1].children[b].classList.add('Delete');
                BlackEl[BlackEl.length] = parentParentEL.children[i + 1].children[b];
                it = -1;
                break;
            } else if (parentParentEL.children[i + 1].children[b].children[0].getAttribute('data-team') === e.currentTarget.children[0].getAttribute('data-team')) {
                if (!(parentParentEL.children[i + 1].children[b] === e.currentTarget)) { i = -1; break }
            }
        }
    } catch (error) { }
}

// move elem
function appendItem(e) {
    try {e.currentTarget.append(actived[actived.length - 1])} catch (error) { }
    resetEvents()
    white= !white
}

//replace and del element
function replaceItem(e) {
    try {
        //set numbers
        if(e.currentTarget.children[0].getAttribute('data-team')==='White'){
            document.querySelector('.Black_num').innerHTML = Number(document.querySelector('.Black_num').innerHTML) + 1
        }
        if(e.currentTarget.children[0].getAttribute('data-team')==='Black'){
            document.querySelector('.White_num').innerHTML = Number(document.querySelector('.White_num').innerHTML) + 1
        }
    } catch (error) {}
    try {
        //replace el
        e.currentTarget.innerHTML = ''
        e.currentTarget.append(BlackEl[BlackEl.length - 1])
    } catch (error) { }
    resetEvents()
    white= !white
}

// reset events for new select elements
function resetEvents() {
    block.forEach(w => {
        w.removeEventListener('click', replaceItem);
        w.removeEventListener('click', appendItem);
        w.removeEventListener('click', select);
    })
    BlackEl = [];actived = [];
    block.forEach(el => el.addEventListener('click', select));
    block.forEach(i => { i.classList.remove('select') });
    block.forEach(i => { i.classList.remove('Active') });
    block.forEach(i => { i.classList.remove('Delete') });
}
// info
alert('بازی دست به مهره هست. هر چی انتخاب کردی باید اونو تکون بدی ای دگه ای نمیش کلیک کرد قفل میشه');
alert('اگ اشتباهی کلیک کردی و قفل شد میتونی روی همون المنت دابل کلیم(دوبار کلیک متوالی) کنی تا از قفل در بیاد :)')