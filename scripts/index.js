$(window).on('load', function() {

    var backendUrl = 'https://api.vihotar.com'

    var accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        $('#login-btn').hide();
        $('#signup-btn').hide();
        $('#dashboard-btn').on('click', function(e) {
            e.preventDefault();
            window.location.href = backendUrl + '/dashboard/login/' + accessToken;
        });
        $('#logout-btn').on('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('access_token');
            window.location.href = window.location.href;
        });
    } else{
        $('#dashboard-btn').hide();
        $('#logout-btn').hide();
    }

});