<script setup lang="ts">

type Message = {
    text: string;
    isUser: boolean;
    time: string;
}

const messages = ref<Message[]>([]);
const newMessage = ref('');
const chatContainer = ref<HTMLDivElement | null>(null);

const sendMessage = () => {
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    messages.value.push({ text: newMessage.value, isUser: true, time });
}

</script>

<template>
    <section
        class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl h-[calc(100vh-3rem)] shadow-lg flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3">
                <img src="/images/aiko.jpg" alt="Aiko" class="w-20 h-20 rounded-full object-cover ring-2 ring-cyan-500">
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Aiko</h2>
                    <p class="text-sm text-cyan-500">Online</p>
                </div>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="chatContainer">
            <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
                <div class="p-4 bg-cyan-500 rounded-full mb-4 shadow-lg">
                    <Icon name="material-symbols:chat" class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Welcome to Aiko Chat!</h3>
                <p class="text-gray-600 dark:text-gray-400 max-w-sm">I'm here to help you stay organized and answer any
                    questions you might have.</p>
                
            </div>
            <template v-else>
                <div v-for="(message, index) in messages" :key="index" :class="[
                    'max-w-[80%] p-3 rounded-lg shadow-md',
                    message.isUser ?
                        'ml-auto bg-cyan-500 text-white' :
                        'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white'
                ]">
                    {{ message.text }}
                    <div class="text-xs mt-1 opacity-70">{{ message.time }}</div>
                </div>
            </template>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex gap-2">
                <input v-model="newMessage" type="text" placeholder="Type your message..."
                    class="flex-1 bg-white/50 dark:bg-black/50 border placeholder-current dark:text-white dark:placeholder-white rounded-full px-4 py-2 focus:outline-none">
                <button @click="sendMessage" :disabled="!newMessage.trim()"
                    :class="['p-2 rounded-full transition-colors',
                        newMessage.trim() ? 'bg-cyan-500 border-none hover:bg-cyan-600 text-white' : 'border-none bg-gray-300 text-gray-500 cursor-not-allowed']">
                    <Icon name="material-symbols:send" class="w-6 h-6" />
                </button>
            </div>
        </div>
    </section>
</template>