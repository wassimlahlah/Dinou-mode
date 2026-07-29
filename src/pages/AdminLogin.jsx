import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";


export default function AdminLogin(){


const navigate = useNavigate();


function handleLogin(e){

e.preventDefault();

navigate("/dashboard");

}



return (

<div
className="
min-h-screen

flex

items-center

justify-center

bg-pink-50
"
>


<motion.form

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

onSubmit={handleLogin}

className="
bg-white

shadow-xl

rounded-3xl

p-10

w-full

max-w-md
"

>


<h1

className="
text-4xl

font-serif

text-center

mb-8
"

>

Dinou Moda

</h1>


<h2

className="
text-center

text-gray-500

mb-8
"

>

Admin Login

</h2>



<input

type="email"

placeholder="Email"

className="
w-full

border

p-4

rounded-xl

mb-4
"

/>


<input

type="password"

placeholder="Password"

className="
w-full

border

p-4

rounded-xl

mb-6
"

/>


<button

className="
w-full

bg-black

text-white

py-4

rounded-full

hover:bg-pink-200

hover:text-black

transition
"

>

Login

</button>


</motion.form>


</div>

)

}