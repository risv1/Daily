<script setup lang="ts">
definePageMeta({
  layout: "dash",
  middleware: "auth",
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const todayWorkout = ref({
  exercises: [
    { name: "Bench Press", sets: 4, reps: 12, weight: 60, completed: false },
    { name: "Shoulder Press", sets: 3, reps: 12, weight: 40, completed: false },
    {
      name: "Tricep Extensions",
      sets: 3,
      reps: 15,
      weight: 25,
      completed: false,
    },
    { name: "Lateral Raises", sets: 3, reps: 15, weight: 10, completed: false },
    { name: "Push-ups", sets: 3, reps: 20, weight: 0, completed: false },
  ],
});

const completedExercises = computed(() => {
  return todayWorkout.value.exercises.filter((exercise) => exercise.completed)
    .length;
});

const weekProgress = ref([
  { name: "Mon", completion: 100 },
  { name: "Tue", completion: 85 },
  { name: "Wed", completion: 90 },
  { name: "Thu", completion: 75 },
  { name: "Fri", completion: 0 },
  { name: "Sat", completion: 0 },
  { name: "Sun", completion: 0 },
]);

const upcomingWorkouts = ref([
  {
    name: "Lower Body",
    time: "Tomorrow, 9:00 AM",
    duration: "50 min",
    icon: "material-symbols:fitness-center",
  },
  {
    name: "Core Workout",
    time: "Wednesday, 10:00 AM",
    duration: "30 min",
    icon: "material-symbols:exercise",
  },
  {
    name: "Cardio Session",
    time: "Thursday, 8:00 AM",
    duration: "45 min",
    icon: "material-symbols:directions-run",
  },
]);
</script>

<template>
  <main class="flex flex-col gap-3 w-full h-full">
    <div
      class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300"
    >
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Workout Plan
      </h1>
      <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Icon name="material-symbols:calendar-today" class="w-5 h-5" />
        <p class="text-lg">{{ currentDate }}</p>
      </div>
    </div>
    <div
      class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300"
    >
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-cyan-500 rounded-lg">
            <Icon
              name="material-symbols:fitness-center"
              class="w-6 h-6 text-white"
            />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
            Today's Workout
          </h2>
        </div>
        <span class="text-sm font-medium text-cyan-500"
          >{{ completedExercises }}/{{
            todayWorkout.exercises.length
          }}
          completed</span
        >
      </div>
      <div class="space-y-3">
        <div
          v-for="(exercise, index) in todayWorkout.exercises"
          :key="index"
          class="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 dark:hover:bg-black/50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <input
              v-model="exercise.completed"
              type="checkbox"
              class="rounded text-cyan-500 focus:ring-cyan-500"
            />
            <div>
              <span
                :class="{
                  'line-through text-gray-400': exercise.completed,
                  'text-gray-700 dark:text-gray-300': !exercise.completed,
                }"
              >
                {{ exercise.name }}
              </span>
              <div class="text-sm text-gray-500">
                {{ exercise.sets }} sets × {{ exercise.reps }} reps
              </div>
            </div>
          </div>
          <span class="text-cyan-500">{{ exercise.weight }}kg</span>
        </div>
      </div>
    </div>
    <div
      class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300"
    >
      <div class="flex items-center gap-3 mb-4">
        <div class="p-3 bg-cyan-500 rounded-lg">
          <Icon
            name="material-symbols:trending-up"
            class="w-6 h-6 text-white"
          />
        </div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          Weekly Progress
        </h2>
      </div>
      <div class="flex justify-between gap-2">
        <div
          v-for="(day, index) in weekProgress"
          :key="index"
          class="flex-1 p-3 rounded-lg bg-white/50 dark:bg-black/50 text-center"
        >
          <div class="text-sm text-gray-500 mb-1">{{ day.name }}</div>
          <div class="w-full h-24 flex items-end justify-center">
            <div
              :style="{ height: `${day.completion}%` }"
              class="w-4 bg-cyan-500 rounded-t-lg transition-all duration-500"
            ></div>
          </div>
          <div class="text-sm font-medium text-cyan-500 mt-1">
            {{ day.completion }}%
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300"
    >
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-cyan-500 rounded-lg">
            <Icon
              name="material-symbols:calendar-month"
              class="w-6 h-6 text-white"
            />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
            Upcoming Workouts
          </h2>
        </div>
      </div>
      <div class="space-y-3">
        <div
          v-for="(workout, index) in upcomingWorkouts"
          :key="index"
          class="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 dark:hover:bg-black/50 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Icon :name="workout.icon" class="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">
                {{ workout.name }}
              </h3>
              <div class="text-sm text-gray-500">{{ workout.time }}</div>
            </div>
          </div>
          <div class="flex gap-2">
            <span
              class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 rounded-full text-sm font-medium"
            >
              {{ workout.duration }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
