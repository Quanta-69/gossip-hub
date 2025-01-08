<template>
    <div>
        <header class="container" >
            <nav>
                <NuxtLink to="/" class="logo" >🌶 Gossip <span class="text-white" >Hub</span> 🌶</NuxtLink>
                <ul>
                    <NuxtLink to="/">Home</NuxtLink>
                    <NuxtLink to="/gossip" >Hot Gossip</NuxtLink>
                    <NuxtLink to="/addgist" class="btn" >Add Spice</NuxtLink>
                </ul>
            </nav>
        </header>

        <!-- Output Page Content -->
         <div>
            <slot/>
         </div>
        <!-- Page Content End -->
         <footer class="bg-zinc-900 py-5 flex items-center justify-center gap-3 flex-col" >
            <div class="ctn">
                <NuxtLink to="/" class="underline font-medium" >Home</NuxtLink>
                <NuxtLink to="/gossip" class="underline font-medium" >Latest Gossips</NuxtLink>
                <NuxtLink to="/addgist" class="underline font-medium" >Contribute Gossip</NuxtLink>
            </div>
            <div class="ctn">
                <h1>Made for fun by <NuxtLink class="text-medium text-xl underline" to="https://wa.me/+2349134438269" target="_blank" rel="noopener noreferrer" >Quantoxt</NuxtLink></h1>
            </div>
            <div class="ctn">
                <h1>Need more info about Me? Check my <NuxtLink class="text-medium text-xl underline" to="https://qxt-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" >Portfolio</NuxtLink> </h1>
            </div>
            <div class="ctn">
                
            </div>
            <div class="ctn"><p>© 2025 Spicy Gossip, Inc. All rights reserved.</p></div>
         </footer>
    </div>
</template>

<script setup>

</script>

<style scoped>
.router-link-exact-active{
    color: var(--spice);
}
.btn.router-link-exact-active{
     @apply text-white bg-black
}
header{
    @apply flex items-center flex-wrap justify-center border-b border-gray-500
}
nav{
    .logo{
    @apply text-3xl font-medium text-center w-full my-2
    }

    @apply flex justify-between items-center flex-wrap w-full py-5
}
ul{
    a{
        @apply text-xl font-medium text-white
    }
    @apply flex justify-center gap-4 items-center w-full 
}
.ctn{
    @apply flex items-center justify-center gap-2 py-1 
}
</style>