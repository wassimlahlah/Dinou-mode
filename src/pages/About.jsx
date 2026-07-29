import { motion } from "framer-motion";


export default function About(){

return (

<div className="p-10">


<motion.section

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

className="
max-w-5xl
mx-auto
text-center
"

>


<h1
className="
text-6xl
font-serif
mb-8
"
>

About Dinou Moda

</h1>



<p

className="
text-gray-600
text-lg
leading-8
"

>

Dinou Moda is a luxury women's fashion brand
created to bring elegance, confidence, and modern style
to every woman.

Our collections combine timeless designs,
quality fabrics, and contemporary fashion.

</p>



<div

className="
mt-12

grid

md:grid-cols-3

gap-8
"

>


<div className="
bg-pink-50
p-8
rounded-3xl
">

<h2 className="text-2xl font-bold">

Elegance

</h2>

<p className="mt-3 text-gray-500">

Modern feminine style

</p>

</div>



<div className="
bg-pink-50
p-8
rounded-3xl
">

<h2 className="text-2xl font-bold">

Quality

</h2>

<p className="mt-3 text-gray-500">

Selected materials

</p>

</div>



<div className="
bg-pink-50
p-8
rounded-3xl
">

<h2 className="text-2xl font-bold">

Luxury

</h2>

<p className="mt-3 text-gray-500">

Premium experience

</p>

</div>


</div>


</motion.section>


</div>

)

}