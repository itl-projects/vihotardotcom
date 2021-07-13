
$(window).on('load', function() {

    var accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        $('#signUpDropdownInvoker').attr('style', 'display: none !important;');
    }

    function userLogin(data) {
        localStorage.setItem('refresh_token', data.token.refresh);
        localStorage.setItem('access_token', data.token.access);
    }

    $('#login-form').submit(function(e) {
        e.preventDefault();
        let username = $('#signinSrEmail').val();
        let password = $('#signinSrPassword').val();
        let user_type = $('#signinSrType').val();

        $('#buyer-login').prop('disabled', true);

        $.post(
            'https://api.vihotar.com/api/users/login/',
            {
                'email': username,
                'password': password,
                'type': user_type
            },
            function(data, status) {
                $('#buyer-login').prop('disabled', false);
                if (data.status) {
                    userLogin(data);
                    window.location.href = window.location.href;
                } else {
                    $('#buyer-login-error').text(data['errors']['non_field_errors'][0]);
                }
            }
        )
    });

})
