$(document).ready(function () {
    // Text Area Word Checker
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 2000;  //time in ms (2 seconds)
    //on keyup, start the countdown
    $('.card-normal,.card-alternative,.card-exception').on('input', 'textarea', function () {
        clearTimeout(typingTimer);
        let content = $(this).val();
        let th = $(this);

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
                    curMatch, element, rest, id, value, page
                knownEl = ['page', 'input', 'button', 'radio', 'check_box', 'text_area', 'drop_list', 'help_text']

                while (curMatch = rxp.exec(str)) {
                    try {
                        [element, rest] = [curMatch[1].split('#')[0], curMatch[1].split('#')[1]]; // elName#id>value
                        [id, value] = [rest.split('>')[0], rest.split('>')[1]];
                        if (element !== "" && id !== "" && knownEl.includes(element)) {
                            if (element == 'page') {
                                page = id
                            }
                            obj = { "element": element, "id": id, "page": page, "value": value };
                        }
                        found.push(obj);
                    }
                    catch (err) {
                        alert(err);
                    }
                }
                if (found.length !== 0) {
                    let strFound = '<ul>'
                    found.forEach(function (el, index) {
                        strFound += `<li>Element: ${el.element}, Id:${el.id}, value:${el.value}, Page:${el.page}</li>`
                    });
                    strFound += '</ul>'
                    th.parent('div').siblings('div').find('.element-result').html(strFound);
                } else {
                    th.parent('div').siblings('div').find('.element-result').html('<span>Element Not Found</span>');
                }
            }, doneTypingInterval);
        } else {
            th.parent('div').siblings('div').find('.element-result').html('<span>Element Not Found</span>');
        }
    });


    // Add Action
    $('.card-normal').on('click', '.add-normal-action', function (e) {
        e.preventDefault();
        $('.col-normal-scenario').append(
            `
                    <div class="row row-append-normal-action">
                        <div class="col">
                            <div class="row row-normal-input">
                                <div class="col-1">
                                    <small class="action-order">Action-1</small>
                                </div>
                                <div class="col-3">
                                    <span>Role:</span>
                                    <select class="form-select" name="normal_roles[]" aria-label="Default select example">
                                        <option selected value="">-- Select Roles --</option>
                                        <option value="user">User</option>
                                        <option value="sistem">Sistem</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <span>Action:</span>
                                    <textarea class="form-control" placeholder="Action" name="normal_actions[]" rows="3"></textarea>
                                </div>
                                <div class="col-3">
                                    <span>Element:</span>
                                    <div class="element-result"></div>
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
                        <div class="col">
                            <div class="row row-alternative-input">
                                <div class="col-1">
                                    <small class="action-order">Action-1</small>
                                </div>
                                <div class="col-3">
                                    <span>Role:</span>
                                    <select class="form-select" name="alternative_roles[]" aria-label="Default select example">
                                        <option selected value="">-- Select Roles --</option>
                                        <option value="user">User</option>
                                        <option value="sistem">Sistem</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <span>Action:</span>
                                    <textarea class="form-control" placeholder="Action" name="alternative_actions[]" rows="3"></textarea>
                                </div>
                                <div class="col-3">
                                    <span>Element:</span>
                                    <div class="element-result"></div>
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
                        <div class="col">
                            <div class="row row-exception-input">
                                <div class="col-1">
                                    <small class="action-order">Action-1</small>
                                </div>
                                <div class="col-3">
                                    <span>Role:</span>
                                    <select class="form-select" name="exception_roles[]" aria-label="Default select example">
                                        <option selected value="">-- Select Roles --</option>
                                        <option value="user">User</option>
                                        <option value="sistem">Sistem</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <span>Action:</span>
                                    <textarea class="form-control" placeholder="Action" name="exception_actions[]" rows="3"></textarea>
                                </div>
                                <div class="col-3">
                                    <span>Element:</span>
                                    <div class="element-result"></div>
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
        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-normal-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    $('.card-alternative').on('click', '.remove-alternative-action', function (e) {
        $(this).parent('div').parent('div').parent('div').parent('div').remove();
        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-alternative-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    $('.card-exception').on('click', '.remove-exception-action', function (e) {
        $(this).parent('div').parent('div').parent('div').parent('div').remove();
        // // Update Index Action
        Array.from(document.querySelectorAll(`.row-exception-scenario small.action-order`)).forEach(function (el, index) {
            el.innerHTML = "Action- " + (index + 1);
        });
    });
    // End Remove Action

});