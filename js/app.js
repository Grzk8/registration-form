$(function () {

    $('.form-button').click(function(){
        validForm();
    });

    function validForm() {
        const firstname = $("#firstname").val();
        const lastname = $("#lastname").val();
        const email = $("#email").val();
        const phoneNumber = $("#phone-number").val();
        const postCode = $("#post-code").val();
        const houseNumber = $("#house-number").val();

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const postCodeFormat = /^\d\d-\d\d\d$/;

        $('.error').hide();

        if (firstname == ""){
            $("#firstname").after('<span class="error">Proszę wpisać imię!</span>')
        }
        if (lastname == ""){
            $("#lastname").after('<span class="error">Proszę wpisać nazwisko!</span>')
        }
        if ((email == "") || (!email.match(mailFormat))){
            $("#email").after('<span class="error">Proszę wpisać poprawny adres email!</span>')
        }
        if ((phoneNumber == "") || (phoneNumber.length > 9) || (phoneNumber.length < 9)){
            $("#phone-number").after('<span class="error">Proszę wpisać numer telefonu!</span>')
        }
        if ((postCode == "") || (!postCode.match(postCodeFormat))){
            $("#post-code").after('<span class="error">Proszę wpisać kod pocztowy!</span>')
        }
        if (houseNumber == "") {
            $("#house-number").after('<span class="error">Proszę wpisać numer domu!</span>')
        }
    }

    const post = $("#post-code");
    post.change(function(){

        const postCode = $("#post-code").val();

        if ((postCode != "") || (postCode.match(postCodeFormat))){
            
            const url = 'http://kodpocztowy.intami.pl/api/' + postCode;
            let postData = [];

            $.ajax({

                url: url,
                type: "GET",
                dataType: "jsonp",
                succes: function(data){
                    postData = data;
                    console.log(postData);
                }
            });
        }
    });

 });
