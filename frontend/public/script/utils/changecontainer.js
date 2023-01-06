document.querySelectorAll('[data-name="change-container"]').forEach((btn)=>{
     btn.addEventListener('click',changeContainer)
})
function changeContainer(){
     const {type} = this.dataset
     console.log(type)
     const mainContainer = document.getElementById('main-container')
     console.log(mainContainer)
     const activeContainerId = mainContainer.dataset.activecontainer
     mainContainer.dataset.activecontainer = type
     console.log(activeContainerId)
     document.getElementById(activeContainerId).hidden = true
     document.getElementById(type).hidden = false
}

