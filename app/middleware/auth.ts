export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path == "/home" || to.path == "/workout") {
    checkSession();
  }
});

const checkSession = async () => {
  await $fetch("/api/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    onResponse: (res) => {
      console.log(res);
      if (res.response.status == 401) {
        location.href = "/auth";
      }
    },
  });
};
