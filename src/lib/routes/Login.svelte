<script lang="ts">
    import { slide } from "svelte/transition";
    import { login } from "$firebase";
    import { replace } from "svelte-spa-router";
    import { authStore } from "$stores";
    import Logo from "$components/Logo.svelte";

    let error: boolean = false;
    let errorMessage: string;
    let loading: boolean = false;

    let email: string, password: string;

    const handleFormSubmit = async () => {
        error = false;
        loading = true;
        try {
            await login(email, password);
            replace("/");
        } catch (err) {
            error = true;
            errorMessage = err.message;
        }
        loading = false;
    };

    $: {
        if ($authStore.isLoggedIn && $authStore.updated) {
            replace("/");
        }
    }
</script>

<div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-8"
>
    <Logo />
    <div class="bg-white rounded shadow p-5 w-full md:max-w-md">
        <form on:submit|preventDefault={handleFormSubmit} class="space-y-4">
            <div>
                <label for="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    class="form-input mt-2"
                    bind:value={email}
                />
            </div>
            <div>
                <label for="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    class="form-input mt-2"
                    bind:value={password}
                />
            </div>
            {#if loading}
                <p transition:slide class="line-clamp-1">Please wait...</p>
            {:else if error}
                <p transition:slide class="line-clamp-1 text-red-500">
                    {errorMessage}
                </p>
            {/if}

            <input type="submit" class="float-right btn" value="Login" />
        </form>
    </div>
    <p>
        Don't have an account? <a href="/#/register">Register...</a>
    </p>
    <a href="/#/forgot">Forgot password?</a>
</div>
