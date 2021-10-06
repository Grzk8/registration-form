$(function () {

    $('.send').hide()

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
        let formIsValid = false;

        if (firstname == ""){
            $("#firstname").after('<span class="error">Proszę wpisać imię!</span>')
        }
        else if (lastname == ""){
            $("#lastname").after('<span class="error">Proszę wpisać nazwisko!</span>')
        }
        else if ((email == "") || (!email.match(mailFormat))){
            $("#email").after('<span class="error">Proszę wpisać poprawny adres email!</span>')
        }
        else if ((phoneNumber == "") || (phoneNumber.length > 9) || (phoneNumber.length < 9)){
            $("#phone-number").after('<span class="error">Proszę wpisać numer telefonu!</span>')
        }
        else if ((postCode == "") || (!postCode.match(postCodeFormat))){
            $("#post-code").after('<span class="error">Proszę wpisać kod pocztowy!</span>')
        }
        else if (houseNumber == "") {
            $("#house-number").after('<span class="error">Proszę wpisać numer domu!</span>')
        }
        else formIsValid = true;

        if(formIsValid) {
            $('.section-form').hide()
            $('.send').show()
        }
    }

    const post = $("#post-code");
    post.change(function(){

        const postCode = $("#post-code").val();

        if ((postCode != "") || (postCode.match(postCodeFormat))){
            
            const url = 'http://kodpocztowy.intami.pl/api/' + postCode;
            
            $.ajax({

                url: url,
                type: "GET",
                dataType: 'json',
                
            }).done(function(response){
                addOptions(response);
            })
        }
    });

    function addOptions (data) {
        for (let i=0; i< data.length; i++) {
            const code = data[i];

            const csltown = code.miejscowosc;
            const cslstreet = code.ulica;

            const str = [];
            
            if (cslstreet != undefined) str.push(cslstreet);

            const townOptions = $('<option>' + csltown + '</option>');
            const streetOptions = $('<option>' + str + '</option>');
            const town = $("#town");
            const street = $("#street");
            town.append(townOptions);
            street.append(streetOptions);
        } 
    }

    $('.form-button').click(function(event){
        event.preventDefault();
        validForm(); 
    });

    $('.go-back').click(function(){
        location.reload();
    })
    
 });