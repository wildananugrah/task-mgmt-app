'use client';

import { useNotification } from "@/components/NotificationProviderComponent";

export default function TestNotificationComponent() {
    const { notify } = useNotification();

    return (
        <div className="p-6 space-y-2">
            <button onClick={() => notify('✅ Success!', { type: 'success' })} className="bg-green-600 text-white px-3 py-1 rounded">
                Success
            </button>
            <button onClick={() => notify('⚠️ Warning!', { type: 'warning', duration: 5000 })} className="bg-yellow-400 px-3 py-1 rounded">
                Warning
            </button>
            <button onClick={() => notify('ℹ️ Info message.', { type: 'info' })} className="bg-blue-600 text-white px-3 py-1 rounded">
                Info
            </button>
            <button onClick={() => notify('❌ Error!', { type: 'error' })} className="bg-red-600 text-white px-3 py-1 rounded">
                Error
            </button>
        </div>
    );
}
