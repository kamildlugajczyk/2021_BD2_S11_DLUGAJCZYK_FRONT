import React from 'react';
import AdminControlPanel from '../components/AdminControlPanel';
import MenuBar from '../components/MenuBar';

export default function AdminPanelPage() {

    return (
        <div>
            <MenuBar selected="admin-panel" />
            <AdminControlPanel />
        </div>
    )
}