jQuery.noConflict();

let isLoggedIn = false;
const SOMEKEY = "AISDUAASDNABSDNASDB";

(function ($) {

    chrome.storage.sync.get([SOMEKEY], function (result) {
        if (result[SOMEKEY] && result[SOMEKEY].expires > Date.now()) {
            isLoggedIn = true;
            $("#step-1").hide();
            $("#step-2").show();
        } else {
            chrome.storage.sync.remove([SOMEKEY]);
            isLoggedIn = false;
            $("#step-1").show();
            $("#step-2").hide();
        }
    });

    $("#btnLogin").click(function (e) {
        e.preventDefault();
        const emailId = $("#txtEmail").val();
        fetch('https://cextension-list.s3.us-east-2.amazonaws.com/list.json')
            .then(result => result.json())
            .then((result) => {
                let isFound = false;
                if (result.length) {
                    result.forEach(item => {
                        if (emailId === atob(item)) {
                            isFound = true;
                        }
                    });
                } else {
                    $("#txtLoginMsg").text("Email not in the list, please contact admin.")
                }
                if (isFound) {
                    allowAccess();
                } else {
                    $("#txtLoginMsg").text("Email not in the list, please contact admin.")
                }
            });

        function allowAccess() {
            const EXPIRY_AFTER = 5;
            chrome.storage.sync.set({
                [SOMEKEY]: {
                    val: btoa(btoa(emailId)),
                    expires: (new Date()).setDate((new Date()).getDate() + EXPIRY_AFTER)
                }
            });
            $("#step-1").hide();
            $("#step-2").show();
        }

        return false;
    });


    $(function () {

        // shorthand logging function
        var l = function (message) {

        }

        // Initializing the settings
        settings = new Settings($, 'form.settings');
        settings.get('text-field', l);
        //settings.setCurrentSetting;

        // Activate tabbing
        $('#main-nav a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        reload = new reload($, 'form.settings');


        $('.set-badge').click(function () {
            chrome.browserAction.setBadgeText({'text': '1111'});
        });

        $('.reset-badge').click(function () {
            chrome.browserAction.setBadgeText({'text': ''});
        });

    });
})(jQuery);


function makeHttpObject() {
    try {
        return new XMLHttpRequest();
    } catch (error) {
    }
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (error) {
    }
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (error) {
    }

    throw new Error("Could not create HTTP request object.");
}

var request = new XMLHttpRequest();
request.open("GET", "https://transport-v1.acvauctions.com/jobs/staged.php", true);
request.send(null);
request.onreadystatechange = function () {
    if (request.readyState == 4) {
        var parser = new DOMParser();
        var doc = new DOMParser().parseFromString(request.responseText.toString(), "text/html");
        var elem = doc.getElementsByTagName("td")[2];
        var text = elem.innerText.split(" ")[0].toString();
        chrome.browserAction.setBadgeText({text});
        //alert(text[0]);
    }
};

