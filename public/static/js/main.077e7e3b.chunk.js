(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{36:function(e,t,n){e.exports=n.p+"static/media/library-welcome1.576c144c.jpg"},37:function(e,t,n){e.exports=n.p+"static/media/star.cc5769a3.png"},38:function(e,t,n){e.exports=n(51)},47:function(e,t,n){},48:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(23),u=n.n(c),s=n(7),l=n(15),i=n(1),o=n(34),m=(n(47),n(2)),d=n(3),b=n(5),p=n(4),h=(n(48),function(e){return e({type:"BEGIN_USERS_REQUEST"})}),f=function(e){return{type:"ADD_USERS",users:e}},v=function(e,t){return{type:"ADD_CLUB",clubId:e,userId:t}},E=function(e,t){var n=localStorage.getItem("token"),a={method:"PATCH",headers:{Authorization:"Bearer ".concat(n),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};return function(e){h(e),fetch("/api/v1/users/".concat(t),a).then((function(e){return e.json()})).then((function(t){e(g(t.user.data))}))}},g=function(e){return{type:"LOGIN_USER",userData:e}},O=function(){return{type:"LOGOUT_USER"}},j=function(e){var t=e.showing,n=e.avatar;return r.a.createElement("img",{className:"Avatar",src:n||"https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",alt:t+"'s avatar"||!1})},y=Object(i.b)(null,{logOutUser:O})((function(e){var t=e.user;e.logOutUser;return r.a.createElement("div",{className:"User-box"},r.a.createElement(j,{avatar:t.avatar,showing:t.username}),r.a.createElement("br",null),r.a.createElement(s.b,{to:"/".concat(t.username),exact:!0,className:"Navlink"},r.a.createElement("h3",null,t.username)))})),C=n(18),k=function(e){var t=e.id,n=e.avatar,a=e.name,c=e.description,u=e.members;return r.a.createElement(s.b,{to:"/clubs/".concat(t),exact:!0,className:"Navlink"},r.a.createElement("div",{className:"Club"},r.a.createElement(j,{avatar:n,showing:a}),r.a.createElement("div",{className:"content"},r.a.createElement("h3",null,a),r.a.createElement("p",null,c," ",r.a.createElement("br",null),r.a.createElement("small",null,u.length," members")))))},S=function(e){var t=e.id,n=e.name,a=e.avatar;return r.a.createElement(s.b,{to:"/clubs/".concat(t),exact:!0,className:"Navlink"},r.a.createElement("div",{className:"Club-sidebar"},r.a.createElement(j,{avatar:a,showing:n}),r.a.createElement("h3",null,n)))},N=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];return(e=t.call.apply(t,[this].concat(c))).renderClubs=function(){var t=Object(C.a)(e).props,n=t.clubs,a=t.currentUser;return(n=a?n.filter((function(e){return!a.clubIds.includes(e.id)})):n).map((function(e){var t=e.id,n=e.name,c=e.avatar,u=e.description,s=e.memberIds;return r.a.createElement(k,{key:t,id:t,avatar:c,name:n,description:u,members:s,currentUser:a})}))},e.renderClubsSidebar=function(){var t=Object(C.a)(e).props,n=t.clubs,a=t.currentUser;a&&(n=n.filter((function(e){return e.memberIds.includes(a.id)})));var c=n.map((function(e){var t=e.id,n=e.name,a=e.avatar;return r.a.createElement(S,{key:t,id:t,name:n,avatar:a})}));return r.a.createElement(r.a.Fragment,null,c,r.a.createElement(s.b,{to:"/clubs/new",exact:!0,className:"Create-club Navlink"},r.a.createElement("div",{className:"Club-sidebar Create-club"},r.a.createElement("h3",null,"Create Club"))))},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.renderClubs,t=this.renderClubsSidebar,n=this.props,a=n.styling,c=n.clubsPending;return r.a.createElement("div",{className:"Club-list"},"sidebar"===a?null:r.a.createElement("h2",null,"Clubs"),!1===c?"sidebar"===a?t():e():r.a.createElement("p",null,"Loading..."))}}]),n}(a.Component),U=Object(i.b)((function(e){var t=e.clubs,n=e.users;return{clubs:t.data,clubsPending:t.pending,currentUser:n.currentUser}}))(N);var I=function(){return r.a.createElement("div",{className:"SideNav"},r.a.createElement(s.b,{to:"/",exact:!0,className:"Create-club Navlink"},r.a.createElement("div",{className:"Club-sidebar Create-club"},r.a.createElement("h3",null,"Home"))),r.a.createElement(s.b,{to:"/bestsellers",exact:!0,className:"Create-club Navlink"},r.a.createElement("div",{className:"Club-sidebar Create-club"},r.a.createElement("h3",null,"Bestsellers"))),r.a.createElement(s.b,{to:"/clubs",exact:!0,className:"Create-club Navlink"},r.a.createElement("div",{className:"Club-sidebar Create-club"},r.a.createElement("h3",null,"Clubs"))))},w=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props.currentUser;return r.a.createElement("div",{className:"Sidebar"},e?r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{user:e}),r.a.createElement(s.b,{to:"/bestsellers",exact:!0,className:"Create-club Navlink"},r.a.createElement("div",{className:"Club-sidebar Create-club"},r.a.createElement("h3",null,"Bestsellers"))),r.a.createElement(s.b,{to:"/clubs",exact:!0,className:"Create-club Navlink"},r.a.createElement("div",{className:"Club-sidebar Create-club"},r.a.createElement("h3",null,"Clubs"))),r.a.createElement(U,{styling:"sidebar"})):r.a.createElement(I,{postion:"sidebar"}))}}]),n}(a.Component),A=Object(i.b)((function(e){return{currentUser:e.users.currentUser}}),{addClub:v})(w),_=n(16),T=function(e){return r.a.createElement("div",{className:e.styling},r.a.createElement(s.b,e))},D=Object(i.b)(null,{logOutUser:O})((function(e){var t=e.currentUser,n=e.logOutUser;return r.a.createElement("div",{className:"Navbar"},t?r.a.createElement(T,{to:"/",exact:!0,className:"Navlink",styling:"Header-link",onClick:n},"Log Out"):null)}));var B=function(e){var t=e.currentUser,n=e.logOutUser;return r.a.createElement("header",{className:"Header"},r.a.createElement(D,{currentUser:t,logOutUser:n}))},R=n(13),L=function(e){var t=e.name,n=e.value,a=e.handleChange;switch(t){case"password":case"confirmPassword":return r.a.createElement("input",{name:t,type:"password",onChange:a,value:n,autoComplete:"off"});case"description":case"bio":return r.a.createElement("textarea",{name:t,onChange:a},n);default:return r.a.createElement("input",{name:t,type:"text",onChange:a,value:n,autoComplete:"off"})}},x=function(e){var t=e.inputNames,n=e.inputValues,a=e.submitValue,c=e.handleChange,u=e.handleSubmit,s=function(e){if(/[A-Z]/.test(e)){var t=e.match(/[A-Z]/);return e.charAt(0).toUpperCase()+e.slice(1).replace(t[0]," "+t[0])}return e.charAt(0).toUpperCase()+e.slice(1)};return r.a.createElement("div",{className:"Form-field"},r.a.createElement("form",{onSubmit:u},function(){var e=[];for(var a in t){var u=t[a],l=n[a];e.push(r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{key:u},"comment"===u||"title"===u?null:s(u)," ","title"===u?null:r.a.createElement("br",null),"                                 ",r.a.createElement(L,{key:u,name:u,value:l,handleChange:c})),"comment"===u||"title"===u?null:r.a.createElement("br",null),"             "))}return e}(),r.a.createElement("input",{type:"submit",value:a})))},M=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e.handleChange=function(t){e.setState(Object(R.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var n=e.state;e.props.loginRequest(n),e.setState({username:"",password:""})},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.state,t=e.username,n=e.password;return r.a.createElement("div",{className:"Login-form"},r.a.createElement("h2",null,"Login"),r.a.createElement(x,{handleChange:this.handleChange,handleSubmit:this.handleSubmit,inputNames:{1:"username",2:"password"},inputValues:{1:t,2:n},submitValue:"Login"}))}}]),n}(a.Component),P=n(36),F=n.n(P),V=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={email:"",password:"",confirmPassword:""},e.handleChange=function(t){e.setState(Object(R.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var n=e.state,a={user:{email:n.email,password:n.password,password_confirmation:n.confirmPassword}};e.props.userPostRequest(a),e.setState({email:"",password:"",confirmPassword:""})},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.handleChange,t=this.handleSubmit,n=this.state,a=Object.keys(n),c=Object.values(n);return r.a.createElement("div",{className:"Sign-up"},r.a.createElement("h2",null,"Sign Up"),r.a.createElement(x,{inputNames:a,inputValues:c,handleChange:e,handleSubmit:t,submitValue:"Sign Up"}))}}]),n}(a.Component),J=Object(i.b)(null,{userPostRequest:function(e){var t={method:"POST",headers:{"Content-Type":"application/json",Accepts:"application/json"},body:JSON.stringify(e)};return function(e){h(e),fetch("/api/v1/users",t).then((function(e){return e.json()})).then((function(t){if(console.log(t),t.errors)return console.log(t.errors);localStorage.setItem("token",t.auth_token),e(g(t.user.data))}))}}})(V),q=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={name:"",username:"",bio:""},e.handleChange=function(t){e.setState(Object(R.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var n=e.props,a=n.updateUserRequest,r=n.currentUser;a(e.state,r.id),e.setState({name:"",username:"",bio:""})},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.handleChange,t=this.handleSubmit,n=this.state,a=Object.keys(n),c=Object.values(n);return r.a.createElement("div",{class:"New-user"},r.a.createElement("h2",null,"Welcome!"),r.a.createElement("p",null,"Please fill out this information. Don't worry your name or email won't be made public."),r.a.createElement(x,{inputNames:a,inputValues:c,handleChange:e,handleSubmit:t}))}}]),n}(a.Component),G=Object(i.b)(null,{updateUserRequest:E})(q),Q=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props,t=e.loginRequest,n=e.currentUser;return r.a.createElement("div",{className:"WelcomeContainer"},r.a.createElement("img",{id:"library",src:F.a,alt:"Library"}),n?n.name?r.a.createElement("h1",null,"Welcome ",n.name,"!"):r.a.createElement(G,{currentUser:n,loginUser:g}):r.a.createElement(r.a.Fragment,null,r.a.createElement(M,{loginRequest:t}),r.a.createElement(J,null)))}}]),n}(r.a.Component),z=Object(i.b)(null,{loginRequest:function(e){var t={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};return function(e){h(e),fetch("/auth/login",t).then((function(e){return e.json()})).then((function(t){if(t.failure)return console.log(t.failure);localStorage.setItem("token",t.auth_token),e(g(t.user.data))})).catch((function(e){return console.log(e)}))}},loginUser:g})(Q),H=n(9),W=n(37),X=n.n(W),K=function(){return r.a.createElement("img",{className:"Star",src:X.a,alt:"star"})};var Z=function(e){var t=e.count;return t?r.a.createElement("div",{className:"Rating"},r.a.createElement("div",{className:"Stars"},function(){for(var e=[],n=0;n<t;n++)e.push(r.a.createElement(K,{key:n}));return e}())):null},Y=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];return(e=t.call.apply(t,[this].concat(c))).state={bookData:{}},e.fetchReview=function(){var t=e.props.isbn,n="".concat("AIzaSyDTL71oKAvJaaQV-Jp--O1F2wdjduW_Xhc");fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:".concat(t,"&key=").concat(n)).then((function(e){return e.json()})).then((function(t){return e.setState({bookData:t.items[0].volumeInfo})})).catch((function(e){return console.log(e)}))},e.renderBook=function(t){if(e.state.bookData&&0!==Object.keys(e.state.bookData).length){var n=e.state.bookData,a=n.title,c=n.authors,u=n.publisher,s=n.publishedDate,l=n.description,i=n.categories,o=n.averageRating,m=n.imageLinks;return r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{id:"book",src:m?m.thumbnail:"",alt:a+" Cover Art"}),r.a.createElement("div",{className:"details"},r.a.createElement("h3",null,a),r.a.createElement("h3",null,"By: ",c?Object(H.a)(c).join(", "):""),o>0?r.a.createElement(Z,{count:o}):null,r.a.createElement("p",null,"Categories: ",i?Object(H.a)(i).join(", "):""),r.a.createElement("p",null,"Published: ",s),r.a.createElement("p",null,"Publisher: ",u)),r.a.createElement("p",null,l))}return r.a.createElement("h3",null,"Sorry we couldn't seem to find that book.")},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.fetchReview()}},{key:"render",value:function(){return r.a.createElement("div",{className:"Book-show"},this.renderBook())}}]),n}(a.Component),$=n(17),ee=n.n($),te=n(22);function ne(e){var t=e.title,n=e.author,a=e.description,c=e.src,u=e.isbn13,l=e.currentUser,i=e.updateUserRequest;return r.a.createElement("div",{className:"Book"},r.a.createElement("img",{src:c,alt:t+" Cover Picture"}),r.a.createElement("div",{className:"details"},r.a.createElement("h3",null,r.a.createElement(s.b,{to:"/bestsellers/".concat(u),exact:!0,className:"Navlink"},t)),r.a.createElement("h3",null,"By: ",n),r.a.createElement("p",null,a)),r.a.createElement("div",{className:"buttons"},l?r.a.createElement(s.b,{to:"/".concat(l.username),exact:!0,className:"Navlink",onClick:function(){return i({favorite_book_isbn13:u},l.id)}},r.a.createElement("h3",null,"Make favorite")):null))}ne.defaultProps={title:"Title Missing",author:"Author Missing",src:"https://www.google.com/url?sa=i&url=https%3A%2F%2Freadtiger.com%2Fwkp%2Fen%2FBook%3AJulia_Lee&psig=AOvVaw0DuqWZ0Te6nFrmVXIIVetb&ust=1586286067381000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjg6Z--1OgCFQAAAAAdAAAAABAD",description:"No description posted"};var ae=Object(i.b)((function(e){return{currentUser:e.users.currentUser}}),{updateUserRequest:E})(ne),re=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"renderBooks",value:function(){return this.props.books.map((function(e){return r.a.createElement(ae,{key:e.primary_isbn13,title:e.title,author:e.author,publisher:e.publisher,description:e.description,src:e.book_image,amazonUrl:e.amazon_product_url,isbn10:e.primary_isbn10,isbn13:e.primary_isbn13})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"Book-list"},this.renderBooks())}}]),n}(a.Component),ce=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={select:"hardcover-fiction",books:[],options:[]},e.fetchBestSellers=function(){fetch("https://api.nytimes.com/svc/books/v3/lists/current/".concat(e.state.select,".json?api-key=").concat("8SUMOutAxn2b4K3c0DXro1ANnSMr5mwr")).then((function(e){return e.json()})).then((function(t){return e.setState({books:t.results.books})}))},e.handleSelectChange=function(t){e.setState({select:t.target.value},e.fetchBestSellers)},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(te.a)(ee.a.mark((function e(){var t;return ee.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchOptions();case 2:t=e.sent,t=Object(H.a)(new Set(t)),this.setState({options:t}),this.fetchBestSellers();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchOptions",value:function(){return fetch("https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=8SUMOutAxn2b4K3c0DXro1ANnSMr5mwr").then((function(e){return e.json()})).then((function(e){return e.results.map((function(e){return e.list_name}))}))}},{key:"selectOptions",value:function(){return this.state.options.map((function(e,t){return r.a.createElement("option",{key:t,value:e.replace(/\s/g,"-").toLowerCase()},e)}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"New York Times Best Sellers"),r.a.createElement("div",{className:"NYTimes"},r.a.createElement("div",{className:"select-container"},r.a.createElement("label",null,"Categories "),r.a.createElement("select",{onChange:this.handleSelectChange,value:this.state.select,className:"select"},this.selectOptions())),r.a.createElement(re,{books:this.state.books})))}}]),n}(a.Component),ue=Object(i.b)((function(e){return{users:e.users.data}}))((function(e){e.id;var t=e.userId,n=e.content,a=e.time,c=e.users.find((function(e){return e.id===t})),u=c.username,s=c.avatar;return r.a.createElement("div",{className:"Comment-card"},r.a.createElement(j,{avatar:s,showing:u}),r.a.createElement("p",null,r.a.createElement("strong",null,u)," - ",a),r.a.createElement("p",null,n))})),se=function(e){var t=e.comments,n=e.usersPending,a=e.commentsPending;return r.a.createElement("div",{className:"list-comments"},n||a?r.a.createElement(r.a.Fragment,null,"loading.."):(t=function(e){return e.sort((function(e,t){return new Date(t.posted)-new Date(e.posted)}))}(t),n||a?r.a.createElement(r.a.Fragment,null,"loading..."):t.map((function(e){var t=e.id,n=e.userId,a=e.content,c=e.posted;return r.a.createElement(ue,{key:t,id:t,userId:n,content:a,time:c.toLocaleString("en-US")})}))))},le=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={book:!1},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.fetchBookInfo()}},{key:"fetchBookInfo",value:function(){var e=this,t=this.props.isbn,n="".concat("AIzaSyDTL71oKAvJaaQV-Jp--O1F2wdjduW_Xhc");fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:".concat(t,"&key=").concat(n)).then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({book:t.items[0].volumeInfo})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){if(console.log(this.props),this.state.book){var e=this.state.book,t=e.title,n=e.authors,a=e.averageRating,c=e.imageLinks;return r.a.createElement("div",{className:"Club-book"},r.a.createElement("img",{id:"clubbook",src:c?c.thumbnail:"",alt:t+" Cover Art"}),r.a.createElement("div",{className:"Club-book-details"},r.a.createElement("h3",null,t),r.a.createElement("p",null,n),r.a.createElement(Z,{count:a})))}return r.a.createElement("p",null,"loading...")}}]),n}(a.Component);var ie=Object(i.b)((function(e){var t=e.users,n=e.clubs,a=e.comments;return{clubs:n.data.filter((function(e){return e.id===t.currentUser.id})),comments:a.data.filter((function(e){return e.userId===t.currentUser.id})).slice(0,5),currentUser:t.currentUser,commentsPending:a.pending,clubsPending:n.pending,usersPending:t.pending}}))((function(e){var t=e.comments,n=e.commentsPending,a=e.usersPending,c=e.currentUser,u=c.name,s=c.bio,l=c.currentlyReading;return console.log(l),r.a.createElement("div",{className:"Profile"},r.a.createElement("div",{className:"info"},r.a.createElement("h2",null,u),r.a.createElement("p",null,s)),r.a.createElement("div",{className:"reading"},l?r.a.createElement(le,{isbn:l}):r.a.createElement(r.a.Fragment,null,"loading...")),r.a.createElement("div",{className:"comments"},n||a?r.a.createElement(r.a.Fragment,null,"loading..."):r.a.createElement(se,{comments:t})))})),oe=function(e){return e({type:"BEGIN_CLUBS_REQUEST"})},me=localStorage.getItem("token"),de=function(e){return{type:"ADD_CLUBS",clubs:e}},be=function(e){return{type:"CREATE_CLUB",club:e}},pe=function(e,t){return{type:"ADD_CLUB_MEMBER",clubId:e,userId:t}},he=function(e){return{type:"REMOVE_CLUB_MEMBER",clubId:e.clubId,userId:e.userId}},fe=n(26),ve=function(e){return{type:"ADD_COMMENTS",comments:e}},Ee=function(e){return{type:"POST_COMMENT",payload:e}},ge=Object(i.b)(null,{postComment:function(e){return function(t){t({type:"BEGIN_COMMENTS_REQUEST"}),fetch("/api/v1/comments",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return t(Ee(e))})).catch((function(e){return console.log(e)}))}}})((function(e){var t=e.currentUser,n=t.id,c=t.avatar,u=t.username,s=e.threadId,l=e.postComment,i=Object(a.useState)(""),o=Object(fe.a)(i,2),m=o[0],d=o[1];return r.a.createElement("div",{className:"Comment-field"},r.a.createElement(j,{avatar:c,showing:u}),r.a.createElement(x,{handleSubmit:function(e){e.preventDefault(),l({user_id:n,board_id:s,content:m}),d("")},handleChange:function(e){d(e.target.value)},inputNames:{1:"comment"},inputValues:{1:m},submitValue:"Comment"}))})),Oe=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props,t=e.currentUser,n=e.handleSubmit,a=e.handleChange,c=e.comments,u=e.threadId,s=e.title;return r.a.createElement("div",{className:"Thread-card"},r.a.createElement("h3",null,s),r.a.createElement(se,{comments:c}),r.a.createElement(ge,{currentUser:t,threadId:u,handleChange:a,handleSubmit:n}))}}]),n}(a.Component),je=Object(i.b)((function(e){return{users:e.users}}))(Oe),ye=function(e){return e({type:"BEGIN_THREADS_REQUEST"})},Ce=function(e){return{type:"ADD_THREADS",threads:e}},ke=function(e){return{type:"ADD_THREAD",payload:e}};var Se=Object(i.b)(null,{postThread:function(e){var t=localStorage.getItem("token"),n={method:"POST",headers:{Authorization:"Bearer ".concat(t),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};return function(e){ye(e),fetch("/api/v1/boards",n).then((function(e){return e.json()})).then((function(t){if(t.errors)return console.log(t.errors);e(ke(t.thread.data))}))}}})((function(e){var t=e.clubId,n=e.postThread,c=Object(a.useState)(""),u=Object(fe.a)(c,2),s=u[0],l=u[1];return r.a.createElement("div",{className:"Thread-form"},r.a.createElement(x,{handleSubmit:function(e){e.preventDefault(),n({club_id:t,title:s}),l("")},handleChange:function(e){l(e.target.value)},inputNames:{1:"title"},inputValues:{1:s},submitValue:"Begin Thread"}))}));var Ne=Object(i.b)((function(e){var t=e.comments,n=e.threads;return{comments:t.data,commentsPending:t.pending,threads:n.data,threadsPending:n.pending}}))((function(e){var t=e.threads,n=e.club.id,a=e.comments,c=e.currentUser;return r.a.createElement("div",{className:"Thread-list"},r.a.createElement("h2",null,"Threads"),r.a.createElement(s.a,null,r.a.createElement(_.c,null,r.a.createElement(_.a,{exact:!0,path:"/clubs/".concat(n,"/threads/new"),render:function(){return r.a.createElement(Se,{clubId:n,currentUserId:c.id})}}),r.a.createElement(T,{to:"/clubs/".concat(n,"/threads/new"),exact:!0,className:"Navlink",styling:"Thread-form-link"},r.a.createElement("h3",null,"Start a new thread")))),(t=t.filter((function(e){return e.clubId===n}))).map((function(e){var t=e.id,u=e.title,l=a.filter((function(e){return t===e.threadId}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{key:t},r.a.createElement(_.c,{key:t},r.a.createElement(_.a,{key:t,exact:!0,path:"/clubs/".concat(n,"/thread/:id"),render:function(){return r.a.createElement(je,{key:t,title:u,threadId:t,comments:l,currentUser:c})}}),r.a.createElement(T,{key:t,to:"/clubs/".concat(n,"/thread/").concat(t),exact:!0,className:"Navlink",styling:"Thread-link"},r.a.createElement("h3",{key:t},u)))))})))})),Ue=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];return(e=t.call.apply(t,[this].concat(c))).handleJoin=function(){var t=e.props,n=t.clubId;(0,t.memberJoinRequest)({membership:{club_id:n}})},e.handleLeave=function(){var t=e.props,n=t.clubId;(0,t.memberLeaveRequest)(n)},e.renderClub=function(t,n,a){if(t&&n){var c=t.name,u=t.description,s=t.activeBook,l=t.threadIds.map((function(e){return n.filter((function(t){return t.id===e}))})).flat();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Club-details"},r.a.createElement("h1",null,c),e.currentUser?null:e.currentUserIsMember()?r.a.createElement("h3",{id:"leave",onClick:e.handleLeave},"Leave Club"):r.a.createElement("h3",{id:"join",onClick:e.handleJoin},"Join Club"),r.a.createElement("p",null,u)),r.a.createElement(le,{isbn:s}),r.a.createElement(Ne,{threads:l,club:t,currentUser:a}))}},e}return Object(d.a)(n,[{key:"currentUserIsMember",value:function(){var e=this.props,t=e.currentUser,n=e.clubId;return!!e.clubs.find((function(e){return e.id===n})).memberIds.includes(t.id)}},{key:"render",value:function(){var e=this.props,t=e.clubId,n=e.clubs,a=e.clubsPending,c=e.threads,u=e.currentUser,s=n.find((function(e){return e.id===t}));return r.a.createElement("div",{className:"Club-container"},!0===a?r.a.createElement("p",null,"loading...."):this.renderClub(s,c,u))}}]),n}(a.Component),Ie=Object(i.b)((function(e){var t=e.clubs,n=e.threads,a=e.users;return{clubs:t.data,clubsPending:t.pending,threads:n.data,threadsPending:n.pending,currentUser:a.currentUser}}),{memberJoinRequest:function(e){var t={method:"POST",headers:{Authorization:"Bearer ".concat(me),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};return function(e){oe(e),fetch("/api/v1/memberships",t).then((function(e){return e.json()})).then(function(){var t=Object(te.a)(ee.a.mark((function t(n){return ee.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.errors){t.next=2;break}return t.abrupt("return",console.log(n.errors));case 2:e(pe(n.clubId,n.userId));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},memberLeaveRequest:function(e){var t={method:"DELETE",headers:{Authorization:"Bearer ".concat(me),"Content-Type":"application/json",Accept:"application/json"}};return function(n){oe(n),fetch("/api/v1/memberships/".concat(e),t).then((function(e){return e.json()})).then((function(e){if(e.errors)return console.log(e.errors);n(he(e)),n({type:"LEAVE_CLUB",clubId:e.clubId})}))}}})(Ue),we=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={name:"",description:""},e.handleChange=function(t){e.setState(Object(R.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var n=Object(C.a)(e),a=n.state,r=a.name,c=a.description,u=n.props;(0,u.postClub)({club:{name:r,description:c}},u.currentUser.id),e.setState({name:"",description:""})},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.handleChange,t=this.handleSubmit,n=this.state,a=Object.keys(n),c=Object.values(n);return r.a.createElement("div",{className:"Club-form"},r.a.createElement("h2",null,"Create Club"),r.a.createElement(x,{inputNames:a,inputValues:c,handleChange:e,handleSubmit:t}))}}]),n}(a.Component),Ae=Object(i.b)(null,{postClub:function(e,t){var n={method:"POST",headers:{Authorization:"Bearer ".concat(me),"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)};return function(e){oe(e),fetch("/api/v1/clubs",n).then((function(e){return e.json()})).then(function(){var n=Object(te.a)(ee.a.mark((function n(a){var r;return ee.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!a.errors){n.next=2;break}return n.abrupt("return",console.log(a.errors));case 2:return n.next=4,e(be(a.club));case 4:r=n.sent,e(v(r.club.data.id,t));case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}},addClub:v})(we),_e=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props.currentUser;return r.a.createElement("main",null,r.a.createElement(B,{currentUser:e,logOutUser:O}),r.a.createElement(_.c,null,r.a.createElement(_.a,{exact:!0,path:"/",render:function(){return r.a.createElement(z,{currentUser:e})}}),r.a.createElement(_.a,{exact:!0,path:"/clubs",render:function(){return r.a.createElement(U,{currentUser:e})}}),r.a.createElement(_.a,{exact:!0,path:"/clubs/new",render:function(){return r.a.createElement(Ae,{currentUser:e})}}),r.a.createElement(_.a,{exact:!0,path:"/clubs/:id",render:function(t){var n=t.match;return r.a.createElement(Ie,{clubId:n.params.id,currentUser:e})}}),r.a.createElement(_.a,{exact:!0,path:"/bestsellers",component:ce}),r.a.createElement(_.a,{exact:!0,path:"/bestsellers/:isbn",render:function(e){var t=e.match;return r.a.createElement(Y,{isbn:t.params.isbn})}}),r.a.createElement(_.a,{exact:!0,path:"/:username",render:function(){return r.a.createElement(ie,null)}})))}}]),n}(a.Component),Te=Object(i.b)((function(e){var t=e.clubs,n=e.users;return{clubs:t.data,currentUser:n.currentUser}}),{logOutUser:O})(_e),De=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.fetchClubs,n=e.fetchUsers,a=e.fetchThreads,r=e.fetchComments,c=e.authorizeToken;localStorage.getItem("token")&&c(),t(),n(),a(),r()}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(A,null),r.a.createElement(Te,null))}}]),n}(a.Component),Be=Object(i.b)(null,{fetchClubs:function(){return function(e){oe(e),fetch("/api/v1/clubs").then((function(e){return e.json()})).then((function(t){return e(de(t))}))}},fetchUsers:function(){return function(e){h(e),fetch("/api/v1/users").then((function(e){return e.json()})).then((function(t){return e(f(t))}))}},fetchThreads:function(){return function(e){ye(e),fetch("/api/v1/boards").then((function(e){return e.json()})).then((function(t){return e(Ce(t))}))}},fetchComments:function(){return function(e){e({type:"BEGIN_COMMENTS_REQUEST"}),fetch("/api/v1/comments").then((function(e){return e.json()})).then((function(t){return e(ve(t))}))}},authorizeToken:function(){var e=localStorage.getItem("token"),t={method:"POST",headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json",Accepts:"application/json"}};return function(e){h(e),fetch("/auth/auto",t).then((function(e){return e.json()})).then((function(t){if(t.failure)return console.log(t.failure);e(g(t.data))}))}}})(De);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Re=n(8),Le={data:[],pending:!1},xe=function(){var e,t,n,a,r,c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le,u=arguments.length>1?arguments[1]:void 0;switch(u.type){case"BEGIN_CLUBS_REQUEST":return Object(Re.a)({},c,{data:Object(H.a)(c.data),pending:!0});case"ADD_CLUBS":return t=u.clubs.data.map((function(e){return{id:e.id,name:e.attributes.name,description:e.attributes.description,avatar:e.attributes.avatar,activeBook:"9780545010221",memberIds:e.relationships.users.data.map((function(e){return e.id})),threadIds:e.relationships.boards.data.map((function(e){return e.id}))}})),Object(Re.a)({},c,{data:c.data.concat(t),pending:!1});case"CREATE_CLUB":var s=u.club.data,l=s.id,i=s.attributes,o=i.name,m=i.description,d=s.relationships.users.data;return e={id:l,name:o,description:m,memberIds:d.map((function(e){return e.id})),threadIds:[]},Object(Re.a)({},c,{data:c.data.concat(e),pending:!1});case"ADD_CLUB_MEMBER":return n=(e=c.data.find((function(e){return e.id===u.clubId}))).memberIds.concat(u.userId),a=Object(Re.a)({},e,{memberIds:n}),r=c.data.map((function(t){return t.id!==e.id?t:a})),Object(Re.a)({},c,{data:r,pending:!1});case"REMOVE_CLUB_MEMBER":return n=(e=c.data.find((function(e){return e.id===u.clubId}))).memberIds.filter((function(e){return e!==u.userId})),a=Object(Re.a)({},e,{memberIds:n}),r=c.data.map((function(t){return t.id!==e.id?t:a})),Object(Re.a)({},c,{data:r,pending:!1});default:return c}},Me={data:[],currentUser:!1,pending:!1},Pe=function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Me,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"BEGIN_USERS_REQUEST":return Object(Re.a)({},n,{data:Object(H.a)(n.data),pending:!0});case"ADD_USERS":return t=a.users.data.map((function(e){return{id:e.id,name:e.attributes.name,username:e.attributes.username,email:e.attributes.email,bio:e.attributes.bio,avatar:e.attributes.avatar,currentlyReading:e.attributes.favoriteBookIsbn13?e.attributes.favoriteBookIsbn13.replace(/-/g,""):null,clubIds:e.relationships.clubs.data.map((function(e){return e.id})),commentIds:e.relationships.comments.data.map((function(e){return e.id}))}})),Object(Re.a)({},n,{data:n.data.concat(t),pending:!1});case"ADD_CLUB":return(e=n.data.find((function(e){return e.id===a.userId}))).clubIds=e.clubIds.concat(a.clubId),t=n.data.map((function(t){return t.id!==e.id?t:e})),Object(Re.a)({},n,{data:t,currentUser:e,pending:!1});case"LOGIN_USER":var r=a.userData,c=r.id,u=r.attributes,s=u.name,l=u.username,i=u.email,o=u.bio,m=u.avatar,d=u.favoriteBookIsbn13,b=r.relationships,p=b.clubs.data,h=b.comments.data,f={id:c,name:s,username:l,email:i,bio:o,avatar:m,currentlyReading:d?d.replace(/-/g,""):null,clubIds:p.map((function(e){return e.id})),commentIds:h.map((function(e){return e.id}))};return Object(Re.a)({},n,{currentUser:f,pending:!1});case"LEAVE_CLUB":var v=(e=n.currentUser).clubIds.filter((function(e){return e!==a.clubId})),E=Object(Re.a)({},e,{clubIds:v});return Object(Re.a)({},n,{currentUser:E,pending:!1});case"LOGOUT_USER":return localStorage.clear(),Object(Re.a)({},n,{currentUser:!1,pending:!1});default:return n}},Fe={data:[],pending:!1},Ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"BEGIN_THREADS_REQUEST":return Object(Re.a)({},e,{data:Object(H.a)(e.data),pending:!0});case"ADD_THREADS":var n=t.threads.data.map((function(e){return{id:e.id,title:e.attributes.title,clubId:e.relationships.club.data.id,commentIds:e.relationships.comments.data.map((function(e){return e.id}))}}));return Object(Re.a)({},e,{data:e.data.concat(n),pending:!1});case"ADD_THREAD":var a=t.payload,r=a.id,c=a.attributes.title,u=a.relationships.club.data.id,s={id:r,title:c,clubId:u};return Object(Re.a)({},e,{data:e.data.concat(s),pending:!1});default:return e}},Je={data:[],pending:!1},qe=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Je,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"BEGIN_COMMENTS_REQUEST":return Object(Re.a)({},t,{data:Object(H.a)(t.data),pending:!0});case"ADD_COMMENTS":var a=n.comments.data.map((function(e){return{id:e.id,content:e.attributes.content,userId:e.relationships.user.data.id,threadId:e.relationships.board.data.id,posted:new Date(e.attributes.createdAt)}}));return Object(Re.a)({},t,{data:t.data.concat(a),pending:!1});case"POST_COMMENT":var r={id:(e=n.payload.data).id,content:e.attributes.content,userId:e.relationships.user.data.id,threadId:e.relationships.board.data.id,posted:new Date(e.attributes.createdAt)};return Object(Re.a)({},t,{data:[].concat(Object(H.a)(t.data),[r]),pending:!1});default:return t}},Ge=Object(l.c)({clubs:xe,users:Pe,threads:Ve,comments:qe}),Qe=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).state={hasError:!1},a}return Object(d.a)(n,[{key:"componentDidCatch",value:function(e,t){console.log(e,t)}},{key:"render",value:function(){return this.state.hasError?r.a.createElement("h1",null,"Something went wrong."):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),n}(a.Component),ze=Object(l.e)(Ge,Object(l.d)(Object(l.a)(o.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,{store:ze},r.a.createElement(s.a,null,r.a.createElement(Qe,null,r.a.createElement(Be,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.077e7e3b.chunk.js.map