$(window).on('load', function() {

    $('#SignUpForm').on('submit', function(e) {
        e.preventDefault();

        $('#successDiv').hide();
        $('#btnFetch').html('<i class="fa fa-spinner fa-spin"></i> loading...');

        let first_name = $('#loginFirstname').val();
        let last_name = $('#loginLastname').val();
        let email = $('#loginUsername').val();
        let password1 = $('#loginPassword').val();
        let password2 = $('#loginPassword2').val();

        if (password1 != password2) {
            $('#btnFetch').html('Sign up');
            $('#error-text').text("Passwords did not match. Try again");
            $('#errorDiv').show();
            return;
        }

        $.post(
            'https://api.vihotar.com/api/users/register/buyer/',
            {
                'firstName': first_name,
                'lastName': last_name,
                'email': email,
                'password': password1
            },
            function(data, status) {
                $('#btnFetch').html('Sign up');
                if (data.status) {
                    $('#errorDiv').hide();
                    $('#signUpForm').trigger('reset');
                    $('#successDiv').show();
                } else {
                    if (data['errors']['email'] != undefined) {
                        $('#error-text').text(data['errors']['email']);
                        $('#errorDiv').show();
                    } else {
                        $('#error-text').text('Error! Please try again');
                        $('#errorDiv').show();
                    }
                }
            }
        )
    });


    $('#sellerSignUpForm').on('submit', function(e) {
        e.preventDefault();
        
        $('#successDiv').hide();
        $('#btnFetch').html('<i class="fa fa-spinner fa-spin"></i> loading...');
        
        let first_name = $('#loginFirstname').val();
        let last_name = $('#loginLastname').val();
        let email = $('#loginUsername').val();
        let company = $('#loginCompany').val();
        let brand = $('#loginBrand').val();
        let password1 = $('#loginPassword').val();
        let password2 = $('#loginPassword2').val();

        if (password1 != password2) {
            $('#btnFetch').html('Sign up');
            $('#error-text').text("Passwords did not match. Try again");
            $('#errorDiv').show();
            return;
        }

        $.post(
            'https://api.vihotar.com/api/users/register/seller/',
            {
                'firstName': first_name,
                'lastName': last_name,
                'email': email,
                'companyName': company,
                'brandName': brand,
                'password': password1
            },
            function(data, status) {
                $('#btnFetch').html('Sign up');
                if (data.status) {
                    $('#errorDiv').hide();
                    $('#sellerSignUpForm').trigger('reset');
                    $('#successDiv').show();
                } else {
                    if (data['errors']['email'] != undefined) {
                        $('#error-text').text(data['errors']['email']);
                        $('#errorDiv').show();
                    } else {
                        $('#error-text').text('Error! Please try again');
                        $('#errorDiv').show();
                    }
                }
            }
        );

    });

    $('#agentSignUpForm').on('submit', function(e) {
        e.preventDefault();
        
        $('#successDiv').hide();
        $('#btnFetch').html('<i class="fa fa-spinner fa-spin"></i> loading...');
        
        let first_name = $('#loginFirstname').val();
        let last_name = $('#loginLastname').val();
        let email = $('#loginUsername').val();
        let company = $('#loginCompany').val();
        let brand = $('#loginBrand').val();
        let password1 = $('#loginPassword').val();
        let password2 = $('#loginPassword2').val();

        if (password1 != password2) {
            $('#btnFetch').html('Sign up');
            $('#error-text').text("Passwords did not match. Try again");
            $('#errorDiv').show();
            return;
        }

        $.post(
            'https://api.vihotar.com/api/users/register/agent/',
            {
                'firstName': first_name,
                'lastName': last_name,
                'email': email,
                'companyName': company,
                'brandName': brand,
                'password': password1
            },
            function(data, status) {
                $('#btnFetch').html('Sign up');
                if (data.status) {
                    $('#errorDiv').hide();
                    $('#agentSignUpForm').trigger('reset');
                    $('#successDiv').show();
                } else {
                    if (data['errors']['email'] != undefined) {
                        $('#error-text').text(data['errors']['email']);
                        $('#errorDiv').show();
                    } else {
                        $('#error-text').text('Error! Please try again');
                        $('#errorDiv').show();
                    }
                }
            }
        );

    });

});