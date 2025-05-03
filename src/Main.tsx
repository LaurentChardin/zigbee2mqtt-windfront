import NiceModal from "@ebay/nice-modal-react";
import React, { lazy, Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router";
import { WebSocketApiRouter } from "./WebSocketApiRouter.js";
import { AuthForm } from "./components/modal/components/AuthModal.js";
import { NavBar } from "./components/navbar/NavBar.js";
import i18n from "./i18n/index.js";
import store from "./store.js";

const HomePage = lazy(async () => await import("./pages/HomePage.js"));
const DevicesPage = lazy(async () => await import("./pages/DevicesPage.js"));
const DevicePage = lazy(async () => await import("./pages/DevicePage.js"));
const DashboardPage = lazy(async () => await import("./pages/Dashboard.js"));
const NetworkPage = lazy(async () => await import("./pages/NetworkPage.js"));
const GroupsPage = lazy(async () => await import("./pages/GroupsPage.js"));
const GroupPage = lazy(async () => await import("./pages/GroupPage.js"));
const OtaPage = lazy(async () => await import("./pages/OtaPage.js"));
const TouchlinkPage = lazy(async () => await import("./pages/TouchlinkPage.js"));
const LogsPage = lazy(async () => await import("./pages/LogsPage.js"));
const SettingsPage = lazy(async () => await import("./pages/SettingsPage.js"));

export function Main() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        // TODO: re-enable me on live
        // <ErrorBoundary>
        <React.StrictMode>
            <I18nextProvider i18n={i18n}>
                <NiceModal.Provider>
                    <AuthForm id="auth-form" onAuth={async () => {}} />
                    <Provider store={store}>
                        <HashRouter>
                            <WebSocketApiRouter>
                                <NavBar />
                                <main className="p-3">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Routes>
                                            <Route path="/ota" element={<OtaPage />} />
                                            <Route path="/network" element={<NetworkPage />} />
                                            <Route path="/device/:deviceId/:tab?" element={<DevicePage />} />
                                            <Route path="/settings/:tab?" element={<SettingsPage />} />
                                            <Route path="/groups" element={<GroupsPage />} />
                                            <Route path="/group/:groupId?" element={<GroupPage />} />

                                            <Route path="/logs" element={<LogsPage />} />
                                            <Route path="/touchlink" element={<TouchlinkPage />} />
                                            <Route path="/dashboard" element={<DashboardPage />} />
                                            <Route path="/devices" element={<DevicesPage />} />
                                            <Route path="/" element={<HomePage />} />
                                        </Routes>
                                    </Suspense>
                                </main>
                            </WebSocketApiRouter>
                        </HashRouter>
                    </Provider>
                </NiceModal.Provider>
            </I18nextProvider>
        </React.StrictMode>
        // </ErrorBoundary>
    );
}
