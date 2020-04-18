class App extends React.Component{ 
    state={
        show : true
    } 
    
    login = ()=>{        
        //alert(this.id.value +':'+ this.pw.value);
        axios.post('/member/login',{id:this.id.value, pw:this.pw.value})
        .then((res)=>{
            console.log(res);
            this.setState({
                show:false,
                total:0
            });
        })
        .catch((error)=>{console.log(error)});
    } 
    spon_add = ()=>{        
        alert(this.amount.value );
        axios.post('/spon/add',{amount:this.amount.value, wallet:this.wallet.value})
        .then((res)=>{
            console.log(res.data.msg);
            this.setState({
                total:res.data.msg
            });
        })
        .catch((error)=>{console.log(error)});
    } 
    render(){
     
        return(
            <div>
                <h1>Welcome Sponsor~!</h1>
                <div className={this.state.show ? '' : 'hidden'}>
                    ID<input type="text" ref={ref=>this.id=ref}></input><br/>
                    PW<input type="text" ref={ref=>this.pw=ref}></input><br/>
                    <button onClick={this.login} >로그인</button>
                </div>
                <div className={this.state.show ? 'hidden' : ''}>                    
                    후원금<input type="text" ref={ref=>this.amount=ref}></input><br/>
                    후원지갑<input type="wallet" ref={ref=>this.wallet=ref}></input><br/>
                    <button onClick={this.spon_add} >후원하기</button>
                    <br/>total 후원금 : {this.state.total}
                    
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('here'));