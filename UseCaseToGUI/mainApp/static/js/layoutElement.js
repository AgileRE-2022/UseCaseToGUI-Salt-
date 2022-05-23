$(document).ready(function(){
    const todos = $(".todo"); //draggable
    const all_col_status = $(".col-status") //dragTarget
    let draggableTodo = null;

    todos.on('dragstart',dragStart);
    todos.on('dragend',dragEnd);

    function dragStart(){
        draggableTodo = $(this);
        }
    function dragEnd(){
        draggableTodo = null;
        }

    all_col_status.on('dragover',dragOver); // dragover is event attached to dropTarget not draggables
    all_col_status.on('dragenter',dragEnter);
    all_col_status.on('dragleave',dragLeave);
    all_col_status.on('drop',dragDrop);

    function dragOver(e){
        e.preventDefault(); // by default dropping an element is disable, so we need to prevent this behaviour
        }
    function dragEnter(){
        $(this).css({ "border": "1px dashed #ccc" });
        }
    function dragLeave(){
        $(this).css({ "border": "none" });
        }
    function dragDrop() {
        $(this).css({ "border": "none" });
    $(this).append(draggableTodo);

    if($(this).hasClass('status-sorted-element')){
        draggableTodo.find('.conf').show();
            }else{
        draggableTodo.find('.conf').hide();
            }
        
        }
});