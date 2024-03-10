document.addEventListener('DOMContentLoaded', function() {
    // Inicializa com o tema escuro
    document.body.classList.add('dark');

    // Side Menu Interaction
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function() {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');
        })
    });

    // Toggle Sidebar
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function() {
        sidebar.classList.toggle('hide');
    });

    // Search Button Interaction
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function(e) {
        if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });

    // Initialization and Responsive Behavior
    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function() {
        if (this.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    });

    // Dark Mode Toggle
    const switchMode = document.getElementById('switch-mode');

    switchMode.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    });
});
  
  class Dashboard {
    constructor() {
      this.loadData();
      this.form = document.getElementById('data-form');
      this.input = document.getElementById('data-input');
      this.dataContainer = document.getElementById('data-list');
  
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.render();
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const data = this.input.value.trim();
      if (data) {
        if (this.editIndex === undefined) {
          this.dataList.push(data);
        } else {
          this.dataList[this.editIndex] = data;
          delete this.editIndex;
        }
        this.input.value = '';
        this.saveData();
        this.render();
      }
    }
  
    handleEdit(index) {
      this.input.value = this.dataList[index];
      this.editIndex = index;
    }
  
    handleDelete(index) {
      this.dataList.splice(index, 1);
      this.saveData();
      this.render();
    }
  
    saveData() {
      localStorage.setItem('dataList', JSON.stringify(this.dataList));
    }
  
    loadData() {
      this.dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    }
  
    render() {
      this.dataContainer.innerHTML = '';
      this.dataList.forEach((data, index) => {
        const item = document.createElement('li');
        item.classList.add('data-item');
        item.classList.add('status');
        item.classList.add('completed');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = data;
        
        const editButton = document.createElement('button');
        editButton.innerHTML = '<img src="/img/botao-editar.png">';
        editButton.addEventListener('click', () => this.handleEdit(index));
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img src="/img/excluir (1).png">';
        deleteButton.addEventListener('click', () => this.handleDelete(index));
        
        item.appendChild(paragraph);
        item.appendChild(editButton);
        item.appendChild(deleteButton);
        
        this.dataContainer.appendChild(item);
      });
    }
  }
  
  new Dashboard();
  