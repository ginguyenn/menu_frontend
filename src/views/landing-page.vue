<template>
  <!-- Intro -->
    <div class="container">
        <section id="intro_id">
            <!-- Nav bar-->
            <ul class="nav_bar">
                <li class="nav_item"><a href="#intro_id">Home</a></li>
                <li class="nav_item"><a href="src/views/menu.vue">Menu</a></li>
                <li class="nav_item"><a href="#aboutus_id">About us</a></li>
                <li class="nav_item"><a href="#contact_id">Contact</a></li>
            </ul>
            <h1>Welcome to Eatmore</h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend tincidunt nibh, ac venenatis enim dapibus a. Ut convallis, mi sed lacinia rutrum, neque mauris venenatis purus, a luctus justo eros et est. Sed eu fermentum felis. Aliquam vel faucibus metus, a sollicitudin massa. Integer semper dapibus mi, a congue lacus euismod in. Mauris ultricies dapibus velit in laoreet. Suspendisse dignissim, justo a finibus interdum, odio nisl bibendum risus, eu lacinia nisl justo nec risus. Curabitur convallis feugiat odio, eu dictum felis rhoncus et. Nullam iaculis purus in consequat tincidunt. Nunc tristique lacinia eros, ut suscipit ipsum tristique id. Nullam non nunc at erat commodo euismod. Nulla facilisi. Aenean id semper ipsum. Sed in nisl quis tellus venenatis laoreet a vitae eros.</p>
            <img class="intro_img" src="../../../menu_frontend/src/assets/intro.avif" alt="">
        </section>
    </div>
  <!-- table booking-->
    <section id="reservieren_id">
        <div class="booking_input">
            <input v-model="nameField" placeholder="Name" type="text" ref="nameInput">
            <input v-model="personField" placeholder="Person number" @keyup.enter="save()">
            <input v-model="timeField" placeholder="Time" type="time" @keyup.enter="save()">
            <input v-model="dateField" placeholder="Date" type="date" @keyup.enter="save()">
            <button class="booking_btn" type="button" @click="save()">BOOK A TABLE</button>
        </div>
        <div id="booking_info">
            <table>
                <thead>
                <tr class="booking_show">
                    <th>Name</th>
                    <th>Person</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{item.name}}</td>
                    <td>{{item.person}}</td>
                    <td>{{items.time}}</td>
                    <td>{{item.day}}</td>
                </tr>
                <tr>
                    <td>{{ nameField }}</td>
                    <td>{{ personField }}</td>
                    <td>{{timeField}}</td>
                    <td>{{dateField}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
  <!-- About us-->
    <div class="container">
        <section id="aboutus_id">
            <h3 class="aboutus_header">About us</h3>
            <h4 class="aboutus_name">Eatmore Restaurant</h4>
            <p class="aboutus_lorem">lLorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ipsa magnam nesciunt, eaque placeat illo, in, dolorum a ea quas impedit. Natus fugiat id provident commodi perferendis accusamus quod est! <br>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam debitis itaque ut? Maiores, in veritatis atque excepturi ad molestiae? Exercitationem voluptate tempora voluptates saepe officiis similique alias voluptas dolores dolorum? <br>
                Lorem ipsum dolor sit amet consectetur adipisicing eli</p>
        </section>
    </div>
  <!--Contact -->
    <div class="container">
        <section id="contact_id">
            <div class="contact_text">
                <h3 class="contact_header">Contact us</h3>
                <h4 class="contact_name">Eatmore Restaurant</h4>
            </div>
            <!-- contact information -->
            <div class="boxes">
                <div class="box_item">
                    <h5>Information</h5>
                    <p> <br> Adress: 12345, Hamburg</p>
                    <p>Telephone number: +49 xxx xxx xxx</p>
                    <p>E-mail: abc123@gmail.com</p>
                </div>
                <div class="box_item">
                    <h5>Opening</h5>
                    <p> <br> Monday to Saturday <br>
                        1:00 pm - 3:00 pm and 7:00 pm - 11:00 pm <br>
                        <br> Sunday <br>
                        12:30 pm - 3:30 pm</p>
                </div>
                <div class="box_item">
                    <h5>Telephone support</h5>
                    <p> <br> Monday to Saturday <br>
                        from 9:00 am to 9:00 pm</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'DynamicForm',
    components: { },
    props: ['title'],
    data () {
        return {
            items: [],
            nameField: '',
            personField: '',
            timeField: ' ',
            dateField: ' ',
            claims: '',
            accessToken: ''
        }
    },
    methods: {
        myFilterFunc (crit) {
            return this.items.filter(
                it => crit.length < 1 ||
                    it.name.toLowerCase().includes(crit.toLowerCase()))
        },
        loadBookings () {
            const baseUrl = 'http://localhost:8080'
            const email = this.claims.email
            const endpoint = baseUrl + '/api/booking' + '?owner=' + email
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
                // headers: {
                //   Authorization: 'Bearer ' + this.accessToken
                // }
            }
            fetch(endpoint, requestOptions)
                .then(response => response.json())
                .then(result => result.forEach(booking => {
                    this.items.push(booking)
                }))
                .catch(error => console.log('error', error))
        },
        save() {
            const baseUrl = 'http://localhost:8080'
            const endpoint = baseUrl + '/api/booking'
            const data = {
                name: this.nameField,
                person: this.personField,
                time: this.timeField,
                date: this.dateField,
                owner: this.claims.email
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(endpoint, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                })
                .catch(error => console.log('Error:', error))
    },
        async setup () {
            if (this.$root.authenticated) {
                this.claims = await this.$auth.getUser()
                // this.accessToken = await this.$auth.getAccessToken()
            }
        }
    },
    async created () {
        await this.setup()
        this.loadBookings()
    },
    mounted () {
    },
    updated () {
        console.log('UPDATED!')
    }
}
</script>
<style scoped>
/*set color variable*/
:root{
    --background: #071E2F;
    --hover_light_blue: #C3EAF5;
    --hover_dark_blue: #204F84;
    --hover_sky_blue: #6B9CFF;
    --light_grey: #A9BBCF;
    --dark_grey: #697080;
    --smoth: all .10s ease-in;
}
/* tất cả nội dung dự án k quá 1200px */
/* non PC */
.container{
    max-width: 1204px;
    /* giúp responsive */
    width: 100%;
    /* các elements sẽ nằm giữa */
    margin: 0 auto;
    /* trên mobile thì container sẽ có khoảng cách 10px trái phải */
    padding: 0 10px;
}
/* xoá các khoảng cách mặc định */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* trang web có thể trượt xuống */
html{
    scroll-behavior: smooth;
}
/* set font chữ cho toàn web */
body{
    font-family: "Poppins", san-serif;
}
/* booking part*/
/*phần hiển thị thông tin khách đã đặt*/
#booking_info {
    /*chữ cách viền 10px*/
    padding: 10px;
    border-radius: 25px;
    /*cách giao diện 5px*/
    border: 1px solid black;
    /*chuyển chữ ra giữa trang*/
    display: flex;
    justify-content: center;
    align-items: center;
    /*cách input 10px*/
    margin-top: 10px;
    /*cách lề trái phải 190px*/
    margin-left: 190px;
    margin-right:190px;
}
/*khoảng cách giữa cách chữ trong booking show*/
th, td {
    padding: 25px;
}
/*booking insert*/
.booking_input{
    display: flex;
    justify-content: center;
    /*cách intro 60px*/
    margin-top: 60px;
}
input{
    border-radius: 5px;
    margin: 5px;
}
.booking_btn {
    color: white;
    background-color: #071E2F;
    border-radius: 25px;
    padding: 10px;
    /*cách nút booking 10px*/
    margin: 10px;
}
/*màu nền + mau chư nav bar*/
.nav_bar{
    background-color: #071E2F;
    color: #A9BBCF;
}
/* chữ của navigation menu */
ul {
    /* bỏ dấu chấm trước mỗi chữ */
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color:var(--background);
    border-radius: 16px;
    justify-content: center;
}
/* nút navbar đi qua trái*/
.nav_item {
    float: left;
}
/*chỉnh sửa style của chữ cho từng phần từ trong navbar*/
.nav_item a {
    display: block;
    color: var(--light_grey);
    text-align: center;
    /* chữ sẽ cách nhau 14 và 16 nếu ko dính chùm  */
    padding: 14px 16px;
    /* nếu ko có dòng này link sẽ có dấu gạch dưới */
    text-decoration: none;
}
/* Change the link color to #111 (black) on hover */
.nav_item a:hover {
    background-color: transparent;
    border: 1px solid var(--hover_light_blue);
    border-radius: 16px;
    transform: var(--smoth);
}
h1{
    color: var(--background);
    font-size: 40px;
    text-align: left;
    /* khoảng cách từ viền tới chữ Welcome */
    padding-top: 50px;
    padding-right: 30px;
    padding-bottom: 15px;
    padding-left: 80px;
}
/*text style*/
p{
    font-size: 15px;
    text-align: left;
    /* đoạn text chỉ trong khung này: trên phải dưới trái chiều kim đồng hôf */
    /* margin là khoảng cách từ text ra ngoài */
    margin: 25px 350px 15px 20px;
}
/*first picture*/
.intro_img{
    position: absolute;
    /* img sẽ nằm sát bên phải */
    right: 0;
    max-width: 100%;
    width: 250px;
    top: 220px;
}
/* about us page style */
#aboutus_id{
    background-color: #071E2F;
    color: white;
    /* cách trang trước bao nhiu */
    margin-top: 45px;
    /* cách trang sau bao nhiu */
    margin-bottom: 45px;
    /* đoạn text sẽ cách viên bao nhiu  */
    padding: 25px;
    /* gắn hình vô background */
    background-image: url("../../../menu_frontend/src/assets/cooker.avif");
    background-repeat: no-repeat;
    background-position: right top;
    background-attachment: scroll;
}
.aboutus_lorem{
    /*thụt vô 25px*/
    text-indent: 25px;
    /*căn phải*/
    text-align: right;
}
/*contact_part*/
.boxes{
    display: flex; /*sử dụng flex box tạo layout dàn hàng ngang*/
}
.box_item{
    flex: 1; /* Phần tử con trong flex container chiếm đủ không gian theo chiều ngang */
    border: 1px solid white; /* Định dạng viền cho khung */
    padding: 10px; /* Định dạng padding cho nội dung trong khung */
    text-align: center;
    white-space: nowrap; /* Ngăn văn bản xuống dòng tự động */
    margin-top: 65px; /* khoảng cách từ tên nn xuống box*/
    margin-right: 15px; /* Khoảng cách giữa các ô */
    margin-bottom: 20px; /* Khoảng cách dưới của các ô */
    width: 300px; /*boxes sẽ cao 300 rộng 300*/
    height: 300px;
}
/* contact & about us page style */
#contact_id, #aboutus_id{
    /*chữ trắng*/
    color: white;
    background-color: #071E2F;
    /* text sẽ cách background 25px */
    padding: 25px;
}
/*header style for contact & about us page*/
.contact_header, .aboutus_header{
    letter-spacing: 6px;
    font-size: 20px;
}
</style>
