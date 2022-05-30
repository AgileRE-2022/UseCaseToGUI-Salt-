$(document).ready(function () {
    // Text Area Word Checker
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 2000;  //time in ms (2 seconds)
    let sumEl = [],
        knownEl = ['page', 'input', 'button', 'radio', 'check_box', 'text_area', 'drop_list', 'help_text'],
        inPageNormal='',inPageAlternative='',inPageException='';

    //on keyup, start the countdown
    $('.card-normal,.card-alternative,.card-exception').on('input', 'textarea', function () {
        clearTimeout(typingTimer);
        let content = $(this).val();
        let th = $(this);
        th.addClass('active'); // add class active

        // disable all textarea except this class
        $('textarea').not(th).each(function(id,el){
            $(this).attr('disabled',true)
        })
        

        th.parent('div').siblings('div').find('.element-result').html(`<button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Processing...
            </button>`);

        if (content) {
            typingTimer = setTimeout(function () {
                let found = [],          // an array to collect the strings that are found
                    rxp = /{([^}]+)}/g, //regelar expresion ini string {pass} {word} =>[pass,word] 
                    str = content,
                    obj = {},
                    curMatch, element, rest, id, value,
                    typeOfScenario = th.attr('typeOfScenario'),
                    salt

                while (curMatch = rxp.exec(str)) {
                    try {
                        
                        [element, rest] = [curMatch[1].split('#')[0], curMatch[1].split('#')[1]]; // elName#id>value
                        [id, value] = [rest.split('>')[0], rest.split('>')[1]];
                        if (element !== "" && id !== "" && knownEl.includes(element)) {
                            
                            salt = saltElement(element, id, value)

                            if (element == 'page') {
                                if (typeOfScenario == 'normal'){
                                    inPageNormal = id
                                } else if (typeOfScenario == 'alternative'){
                                    inPageAlternative = id
                                }else{
                                    inPageException = id
                                }
                                obj = { 'element': element, 'id': id, 'inPage': null, 'value': value, 'salt': salt, 'scenario': typeOfScenario, 'sorted': false, 'sorted_index': null, 'label': '', 'checked': false };
                            }else{
                                if (typeOfScenario == 'normal') {
                                    page = inPageNormal
                                } else if (typeOfScenario == 'alternative') {
                                    page = inPageAlternative
                                } else {
                                    page = inPageException
                                }
                                obj = { 'element': element, 'id': id, 'inPage': page, 'value': value, 'salt': salt, 'scenario': typeOfScenario, 'sorted': false, 'sorted_index': null, 'label':'', 'checked':false };
                            }
                            found.push(obj);
                        }else{
                        }
                    }
                    catch (err) {
                        alert(err);
                    }
                }
                if (found.length !== 0) {
                    let strFound = '<ul>'
                    found.forEach(function (el, index) {
                        strFound += `<li>Element: ${el.element}, Id:${el.id}, value:${el.value}, in page:${el.inPage}</li>`
                    });
                    strFound += '</ul>'
                    th.parent('div').siblings('div').find('.element-result').html(strFound);
                    th.parent('div').siblings('div').find('input').attr('value', JSON.stringify(found));
                } else {
                    th.parent('div').siblings('div').find('.element-result').html('<span>Element Not Found</span>');
                    th.parent('div').siblings('div').find('input').attr('value', '');
                }

                // SumElement
                // Kumpulin element dari semua scenario
                sumEl = [];
                sumEl = loadEl();

                th.removeClass('active'); // remove class active

                // ENABLE ALL TEXT AREA
                $('textarea').not(th).each(function (id, el) {
                    $(this).attr('disabled', false)
                })
                
            }, doneTypingInterval);
        } else {
            th.parent('div').siblings('div').find('.element-result').html('<span>Element Not Found</span>');
            th.parent('div').siblings('div').find('input').attr('value', '');
        }
        

    });
    // End Text Area Word Checker

    function saltElement(element,id,value){
        // ['page', 'input', 'button', 'radio', 'check_box', 'text_area', 'drop_list', 'help_text']
        let salt = ``
        if(element == 'page'){
            if (value !== undefined){
                salt += `{<size:20>${value}</size>}`
            }else{
                salt += `{<size:20>undefined</size>}`
            }
        }else if (element == 'input'){
            if(value !== undefined){
                salt += `{\"${value}\"}`
            }else{
                salt += `{\"undefined\"}`
            }
        }else if (element == 'button'){
            if(value !== undefined){
                salt += `{[${value}]}`
            }else{
                salt += `{\[undefined\]}`
            }
        }else if (element == 'radio'){
            if(value !== undefined){
                salt += `{() ${value}}`
            }else{
                salt += `{(undefined)}`
            }
        }else if (element == 'check_box'){
            if (value !== undefined) {
                salt += `{[] ${value}}`
            } else {
                salt += `{[undefined]}`
            }
        }
        else if (element == 'drop_list') {
            if (value !== undefined) {
                salt += `{^${value}^}`
            } else {
                salt += `{^undefined^}`
            }
        }else if (element == 'text_area'){
            if (value !== undefined){
                salt += 
                    `{+\n${value}\n.\n"                         "\n}`
            }else {
                salt +=
                    `{+\nundefined\n.\n"                         "\n}`
            }
        }else if(element == 'help_text'){
            if(value !== undefined){
                salt += `{<size:10>${ value }</size>}`
            }else{
                salt += `{<size:10>undefined</size>}`
            }
        }else{
            salt += '{}'
        }
        return salt
    }



    // Ketika form diSubmit
    $('.form-useCaseScenario').on('submit', function(e){
        e.preventDefault();
        let csrf_token = $('input[name="csrfmiddlewaretoken"]').val(),
            actor = $('input[name="actor"]').val(),
            featureName = $('input[name="feature_name"]').val(),
            featureDescription = $('input[name="feature_description"]').val(),
            preCondition = $('input[name="pre_condition"]').val(),
            postCondition = $('input[name="post_condition"]').val(),
            actions = [], role, action, listElement,typeOfUCS, inputElement
            objAction={};

        $('.row-append-normal-action').each(function(index,el){
            role = $(el).find('.select-role').val();
            action = $(el).find('.input-action').val();
            listElement = $(el).find('.element-result').html();
            inputElement = $(el).find('.normal-input-element').val();
            typeOfUCS = $(el).find('.input-action').attr('typeOfScenario');
            objAction = { "role": role, 'action': action, 'listElement': listElement, 'inputElement': inputElement, 'typeOfUCS': typeOfUCS}
            actions.push(objAction);
        });
        $('.row-append-alternative-action').each(function(index,el){
            role = $(el).find('.select-role').val();
            action = $(el).find('.input-action').val();
            listElement = $(el).find('.element-result').html();
            inputElement = $(el).find('.alternative-input-element').val();
            typeOfUCS = $(el).find('.input-action').attr('typeOfScenario');
            objAction = { "role": role, 'action': action, 'listElement': listElement, 'inputElement': inputElement, 'typeOfUCS': typeOfUCS}
            actions.push(objAction);
        });
        $('.row-append-exception-action').each(function(index,el){
            role = $(el).find('.select-role').val();
            action = $(el).find('.input-action').val();
            listElement = $(el).find('.element-result').html();
            inputElement = $(el).find('.exception-input-element').val();
            typeOfUCS = $(el).find('.input-action').attr('typeOfScenario');
            objAction = {"role": role, 'action': action, 'listElement': listElement, 'inputElement':inputElement ,'typeOfUCS': typeOfUCS}
            actions.push(objAction);
        });

        if($('.btn-edit').length == 1){ // submit edit ucs
            let idUcs = $('input[name="idUcs"]').val()
            // Update El
            sumEl = [];
            sumEl = loadEl();

            $.confirm({
                title: 'Edit UCS',
                content: 'This action will remove your configuration!',
                type: 'blue',
                closeIcon: true,
                buttons: {
                    confirm: {
                        text: 'Confirm',
                        btnClass: 'btn-blue',
                        keys: ['enter'],
                        action: function () {
                            $.ajax({
                                method: 'POST',
                                url: '/editUseCaseScenario/',
                                data: {
                                    "idUcs":idUcs,
                                    "actor": actor,
                                    "featureName": featureName,
                                    "featureDescription": featureDescription,
                                    "preCondition": preCondition,
                                    "postCondition": postCondition,
                                    "actions": JSON.stringify(actions),
                                    "sumEl": JSON.stringify(sumEl),
                                    "csrfmiddlewaretoken": csrf_token
                                },
                                success: function (response) {
                                    console.log(response);
                                    window.location.href = '/showUseCaseScenario/'
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                                },
                            })
                        },
                    },
                    cancel: function () {
                    },
                }
            });
        }else{ // submit create ucs
            // Jalankan ajax
            $.ajax({
                method:'POST',
                url:'/createUseCaseScenario/',
                data:{
                    "actor" :actor,
                    "featureName" :featureName,
                    "featureDescription" :featureDescription,
                    "preCondition" :preCondition,
                    "postCondition" :postCondition,
                    "actions" : JSON.stringify(actions),
                    "sumEl":JSON.stringify(sumEl),
                    "csrfmiddlewaretoken":csrf_token},
                success:function(response){
                    console.log(response);
                    window.location.href = '/showUseCaseScenario/'
                },
                error: function (xhr, ajaxOptions, thrownError){
                    console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                },
            })
        }

    });


    // Add Action
    $('.card-normal').on('click', '.add-normal-action', function (e) {
        e.preventDefault();
        $('.col-normal-scenario').append(
            `
                    <div class="row row-append-normal-action">
                        <input type="hidden" value="normal" name="scenario_type[]">
                        <div class="col">
                            <div class="row row-normal-input">
                                <div class="col-1">
                                    <small class="action-order">Action-1</small>
                                </div>
                                <div class="col-3">
                                    <span>Role:</span>
                                    <select class="form-select select-role" name="roles[]" aria-label="Default select example" required>
                                        <option selected value="">-- Select Roles --</option>
                                        <option value="user">User</option>
                                        <option value="sistem">Sistem</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <span>Action:</span>
                                    <textarea class="form-control input-action" placeholder="Action" name="actions[]" rows="3" typeOfScenario="normal" required></textarea>
                                </div>
                                <div class="col-3">
                                    <span>Element:</span>
                                    <div class="element-result"></div>
                                    <input type="hidden" name="elements[]" value="" class="normal-input-element">
                                </div>
                            </div>
                            <div class="row row-remove-normal-action mb-3">
                                <div class="col-12 d-flex justify-content-end">
                                    <a class="btn btn-link remove-normal-action">Delete Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        );
        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-normal-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    $('.card-alternative').on('click', '.add-alternative-action', function (e) {
        e.preventDefault();
        $('.col-alternative-scenario').append(
            `
                    <div class="row row-append-alternative-action">
                        <input type="hidden" value="alternative" name="scenario_type[]">
                        <div class="col">
                            <div class="row row-alternative-input">
                                <div class="col-1">
                                    <small class="action-order">Action-1</small>
                                </div>
                                <div class="col-3">
                                    <span>Role:</span>
                                    <select class="form-select select-role" name="roles[]" aria-label="Default select example" required>
                                        <option selected value="">-- Select Roles --</option>
                                        <option value="user">User</option>
                                        <option value="sistem">Sistem</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <span>Action:</span>
                                    <textarea class="form-control input-action" placeholder="Action" name="actions[]" rows="3" typeOfScenario="alternative" required></textarea>
                                </div>
                                <div class="col-3">
                                    <span>Element:</span>
                                    <div class="element-result"></div>
                                    <input type="hidden" name="elements[]" value="" class="alternative-input-element">
                                </div>
                            </div>
                            <div class="row row-remove-alternative-action mb-3">
                                <div class="col-12 d-flex justify-content-end">
                                    <a class="btn btn-link remove-alternative-action">Delete Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        );
        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-alternative-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    $('.card-exception').on('click', '.add-exception-action', function (e) {
        e.preventDefault();
        $('.col-exception-scenario').append(
            `
                    <div class="row row-append-exception-action">
                        <input type="hidden" value="exception" name="scenario_type[]">
                        <div class="col">
                            <div class="row row-exception-input">
                                <div class="col-1">
                                    <small class="action-order">Action-1</small>
                                </div>
                                <div class="col-3">
                                    <span>Role:</span>
                                    <select class="form-select select-role" name="roles[]" aria-label="Default select example" required>
                                        <option selected value="">-- Select Roles --</option>
                                        <option value="user">User</option>
                                        <option value="sistem">Sistem</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <span>Action:</span>
                                    <textarea class="form-control input-action" placeholder="Action" name="actions[]" rows="3" typeOfScenario="exception" required></textarea>
                                </div>
                                <div class="col-3">
                                    <span>Element:</span>
                                    <div class="element-result"></div>
                                    <input type="hidden" name="elements[]" value="" class="exception-input-element">
                                </div>
                            </div>
                            <div class="row row-remove-exception-action mb-3">
                                <div class="col-12 d-flex justify-content-end">
                                    <a class="btn btn-link remove-exception-action">Delete Item</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        );
        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-exception-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    // End Add Action

    // Remove Action
    $('.card-normal').on('click', '.remove-normal-action', function (e) {
        $(this).parent('div').parent('div').parent('div').parent('div').remove();

        // Update El
        sumEl = [];
        sumEl = loadEl();

        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-normal-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    $('.card-alternative').on('click', '.remove-alternative-action', function (e) {
        $(this).parent('div').parent('div').parent('div').parent('div').remove();

        // Update El
        sumEl = [];
        sumEl = loadEl();

        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-alternative-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    $('.card-exception').on('click', '.remove-exception-action', function (e) {
        $(this).parent('div').parent('div').parent('div').parent('div').remove();

        // Update El
        sumEl = [];
        sumEl = loadEl();

        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-exception-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    // End Remove Action

    // Load Element
    function loadEl() {
        let normalEl = [],
            alternativeEl = [],
            exceptionEl = [],
            kumpulanId = []

        $('.normal-input-element').each(function (index, el) {
            if ($(el).val() !== '') {
                JSON.parse($(el).val()).forEach(function (obj, id) {
                    if (normalEl.length == 0) {
                        kumpulanId.push(obj.id);
                        normalEl.push(obj);
                    } else {
                        if (kumpulanId.indexOf(obj.id) == -1) {
                            kumpulanId.push(obj.id);
                            normalEl.push(obj);
                        }
                    }
                });
            }
        });

        kumpulanId = [];
        $('.alternative-input-element').each(function (index, el) {
            if ($(el).val() !== '') {
                JSON.parse($(el).val()).forEach(function (obj, id) {
                    if (alternativeEl.length == 0) {
                        kumpulanId.push(obj.id);
                        alternativeEl.push(obj);
                    } else {
                        if (kumpulanId.indexOf(obj.id) == -1) {
                            kumpulanId.push(obj.id);
                            alternativeEl.push(obj);
                        }
                    }
                });
            }
        });

        kumpulanId = [];
        $('.exception-input-element').each(function (index, el) {
            if ($(el).val() !== '') {
                JSON.parse($(el).val()).forEach(function (obj, id) {
                    if (exceptionEl.length == 0) {
                        kumpulanId.push(obj.id);
                        exceptionEl.push(obj);
                    } else {
                        if (kumpulanId.indexOf(obj.id) == -1) {
                            kumpulanId.push(obj.id);
                            exceptionEl.push(obj);
                        }
                    }
                });
            }
        });

        return normalEl.concat(alternativeEl, exceptionEl)
    }
    // End Load Element

});