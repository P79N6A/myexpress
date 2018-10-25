define(function() {
    'use strict';
    $('.btn-add').on('click',function(){
        var formobj =  $('.form_nav');
        var formdata = realizeData(formobj);
        console.log(formdata)
        $.ajax({
            url:'/api/addNav',
            type:'POST',
            data:formdata
        }).done(function(resultdata){
            if(resultdata.code == 200){
                formobj.reset();
            }
        })
    })
    function realizeData(formobj){
        var sfirst = formobj.serializeArray();
        var thform = {};
        $.each(sfirst,function(i,n){
            thform[n.name] = n.value;
        })
        return thform;
    }
});