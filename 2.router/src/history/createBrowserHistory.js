function createBrowserHistory() { 
    let globalHistory = window.history;
    
    /**
     * 
     * @param {*} pathname 
     * @param {*} state 
     */
    function push(pathname, state) { 

    }
    const history = {
        action: 'POP',
        push,
        go,
        goBack,
        goForward,
        listen,
        location
    };
    return history;
}

export default createBrowserHistory;