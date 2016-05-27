$(document).ready(function() {
    var listo = [];
    $('#newTaskForm').hide();
    var addTask = function(task, str) {};
    var updateStorage = function() {};
    
    var resumeToDo = () => {
        for (i=0;i<localStorage.length;i+=2) {
            var inner = addTask(localStorage[i], localStorage[i+1]);
            if (localStorage[i+1] === 'inProgress') {
                inner.id = 'inProgress';
                $('#currentList').append(inner.outerHTML);
            }
            else if (inner === 'archived') {
                
            }
        }
        updateStorage();
    }

    
    var listStorage = localStorage;
    var updateStorage = () => {
        for (let i=0,j=0;i<listo.length*2;i+=2,j++) {
            listStorage[i] = listo[j].task;
            listStorage[i+1] = listo[j].id;
        }
    }
    
    $(document).on('click', '#item', function(e) {
        e.preventDefault();
        var task = this;		
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
    });
        
    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });
    
    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });
    
    var advanceTask = function(task) {
        var modified = task.innerText.trim()
            for (var i = 0; i < listo.length; i++) {
                if (listo[i].task === modified) {
                    if (listo[i].id === 'new') {
                        listo[i].id = 'inProgress';
                    } else if (listo[i].id === 'inProgress') {
                        listo[i].id = 'archived';
                    } else {
                        localStorage.removeItem(i * 2);
                        localStorage.removeItem(i * 2 + 1);
                        listo.splice(i, 1); 
                        
                    }
                break;
            }
        }
        task.remove();
        updateStorage();
    };
    

    
    var Task = function(task, id) {
	    this.task = task;
	    this.id = id;
    }
    
    var addTask = function(task, str) {
        if(task) {
            task = new Task(task.toUpperCase(), str);
            listo.push(task);
            if (str === 'new'){
                $('#newItemInput').val('');
                var inner = $('#newList').append(
                                '<a href="#finish" class="" id="item">' +
                                '<li class="list-group-item">' +
                                '<h3>' + task.task + '</h3>'+
                                '<span class="arrow pull-right">' +
                                '<i class="glyphicon glyphicon-arrow-right">' +
                                '</span>' +
                                '</li>' +
                                '</a>'
                            );
            }
            else if (str === 'inProgress') {
                $('#newItemInput').val('');
                var inner = $('#currentList').append(
                                '<a href="#finish" class="" id="inProgress">' +
                                '<li class="list-group-item">' +
                                '<h3>' + task.task + '</h3>'+
                                '<span class="arrow pull-right">' +
                                '<i class="glyphicon glyphicon-arrow-right">' +
                                '</span>' +
                                '</li>' +
                                '</a>'
                            );
                
            }
            else {
                $('#newItemInput').val('');
                var inner = $('#archivedList').append(
                                '<a href="#finish" class="" id="archived">' +
                                '<li class="list-group-item">' +
                                '<h3>' + task.task + '</h3>'+
                                '<span class="arrow pull-right">' +
                                '<i class="glyphicon glyphicon-remove">' +
                                '</span>' +
                                '</li>' +
                                '</a>'
                            );
                
            }

        }   
        updateStorage();
        return inner;
    };
    
    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task, 'new');
        $('#newTaskForm').slideToggle('fast', 'linear');        
    });
    
    $('#add-todo').on('click', function () {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    })
    
    resumeToDo();
    // $('#newTaskForm').fadeToggle('fast', 'linear');
});