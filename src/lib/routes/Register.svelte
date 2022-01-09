<script lang="ts">
    import { slide } from "svelte/transition";
    import { push } from "svelte-spa-router";
    import {
        registerUser,
        addNewUserData,
        loadCurrentUserNotes,
    } from "$firebase";
    import Logo from "$components/Logo.svelte";

    let error: boolean = false;
    let errorMessage: string;
    let loading: boolean = false;

    let name: string, email: string, password: string;

    const handleFormSubmit = async () => {
        error = false;
        loading = true;
        let uid: string;
        try {
            const user = await registerUser(email, password);
            uid = user.user.uid;
        } catch (err) {
            error = true;
            errorMessage = err.message;
            loading = false;
        }
        if (!error) {
            try {
                await addNewUserData(uid, name, email);
            } catch (err) {
                error = true;
                errorMessage = err.message;
            }
        }
        loading = false;

        if (!error) {
            push("/");
            loadCurrentUserNotes();
        }
    };
</script>

<div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-8"
>
    <Logo />
    <div class="bg-white rounded shadow p-5 w-full md:max-w-md">
        <form on:submit|preventDefault={handleFormSubmit} class="space-y-4">
            <div>
                <label for="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    class="form-input mt-2"
                    bind:value={name}
                />
            </div>
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
                <p transition:slide class="line-clamp-1">{errorMessage}</p>
            {/if}

            <input
                type="submit"
                class="float-right btn"
                value="Register"
                disabled={loading}
            />
        </form>
    </div>
    <p>
        Already have an account? <a href="/#/login">Login here...</a>
    </p>
</div>
