
$(window).on('load', function() {

    var backendUrl = 'http://127.0.0.1:8000'

    function userLogin(data) {
        localStorage.setItem('refresh_token', data.token.refresh);
        localStorage.setItem('access_token', data.token.access);
    }

    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();
        let user_type = $('#loginUserType').val();

        $('#successDiv').hide();
        $('#btnFetch').html('<i class="fa fa-spinner fa-spin"></i> loading...');

        $.post(
            backendUrl + '/api/users/login/',
            {
                'email': username,
                'password': password,
                'type': user_type
            },
            function(data, status) {
                $('#btnFetch').html('Sign in');
                if (data.status) {
                    $('#errorDiv').hide();
                    $('#login-form').trigger('reset');
                    $('#successDiv').show();
                    userLogin(data);
                    window.setTimeout(function() {
                        window.location.href = backendUrl + '/dashboard/login/' + data.token.access;
                    }, 1000);
                } else {
                    $('#error-text').text(data['errors']['non_field_errors'][0]);
                    $('#errorDiv').show();
                }
            }
        )
    });

})
