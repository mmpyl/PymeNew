'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';

type Resource = 'users' | 'tenants' | 'plans' | 'subscriptions';
type RecordData = Record<string, any>;
const resources = [
  { key: 'users' as Resource, label: 'Usuarios', singular: 'usuario' },
  { key: 'tenants' as Resource, label: 'Tenants', singular: 'tenant' },
  { key: 'plans' as Resource, label: 'Planes', singular: 'plan' },
  { key: 'subscriptions' as Resource, label: 'Suscripciones', singular: 'suscripción' },
];
const emptyForms: Record<Resource, RecordData> = {
  users: { email: '', password: '', roles: ['USER'] },
  tenants: { name: '', slug: '', description: '', moduleType: 'CUSTOM', status: 'TRIAL', email: '', phone: '' },
  plans: { name: '', description: '', billingCycle: 'MONTHLY', price: 0, currency: 'USD', trialDays: 15, maxUsers: 5, maxStorage: 1000, features: [] },
  subscriptions: { tenantId: '', planName: '', billingCycle: 'MONTHLY', price: 0, currency: 'USD', endDate: '' },
};
function displayValue(value: any) {
  if (value === null || value === undefined || value === '') return 'Sin datos';
  if (typeof value === 'object') return value.email || value.name || JSON.stringify(value);
  return String(value);
}
function columnsFor(resource: Resource) {
  return {
    users: [['email', 'Correo'], ['roles', 'Roles'], ['createdAt', 'Registro']],
    tenants: [['name', 'Nombre'], ['slug', 'Slug'], ['status', 'Estado'], ['moduleType', 'Módulo']],
    plans: [['name', 'Nombre'], ['billingCycle', 'Ciclo'], ['price', 'Precio'], ['isActive', 'Estado']],
    subscriptions: [['tenant', 'Tenant'], ['planName', 'Plan'], ['status', 'Estado'], ['endDate', 'Vence']],
  }[resource] as string[][];
}
export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [resource, setResource] = useState<Resource>('users');
  const [items, setItems] = useState<RecordData[]>([]);
  const [editing, setEditing] = useState<RecordData | null>(null);
  const [form, setForm] = useState<RecordData>(emptyForms.users);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const loadItems = async (selected: Resource = resource) => {
    if (!token) return;
    setLoading(true); setError('');
    try {
      const data = await apiFetch<RecordData[]>(`/${selected}`, { token });
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { setError(err instanceof Error ? err.message : 'No se pudo cargar la información'); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadItems(); }, [resource, token]);
  const selectResource = (next: Resource) => { setResource(next); setEditing(null); setForm(emptyForms[next]); setNotice(''); };
  const openCreate = () => { setEditing({}); setForm({ ...emptyForms[resource] }); };
  const openEdit = (item: RecordData) => { setEditing(item); setForm({ ...item, password: '' }); };
  const save = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    const payload = { ...form };
    if (resource === 'users' && !payload.password) delete payload.password;
    if (resource === 'subscriptions' && payload.endDate) payload.endDate = new Date(payload.endDate).toISOString();
    try {
      await apiFetch(editing?.id ? `/${resource}/${editing.id}` : `/${resource}`, { method: editing?.id ? 'PATCH' : 'POST', body: JSON.stringify(payload), token: token ?? undefined });
      setEditing(null); setNotice(`${resources.find((entry) => entry.key === resource)?.singular} guardado correctamente`); await loadItems();
    } catch (err) { setError(err instanceof Error ? err.message : 'No se pudo guardar'); }
  };
  const remove = async (item: RecordData) => {
    if (!item.id || !window.confirm('¿Confirmas eliminar este registro?')) return;
    try { await apiFetch(`/${resource}/${item.id}`, { method: 'DELETE', token: token ?? undefined }); setNotice('Registro eliminado'); await loadItems(); }
    catch (err) { setError(err instanceof Error ? err.message : 'No se pudo eliminar'); }
  };
  return <ProtectedRoute><div className="min-h-screen bg-[#f4f7fb] text-slate-900 md:flex">
    <aside className="w-full border-b border-slate-200 bg-[#102a43] text-white md:min-h-screen md:w-64 md:border-b-0 md:border-r md:border-slate-800">
      <div className="flex items-center justify-between px-6 py-6 md:block"><div className="text-2xl font-black tracking-tight">Pyme<span className="text-[#f4b942]">N</span></div><div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-300">Centro de gestión</div></div>
      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:block md:px-3">{resources.map((entry) => <button key={entry.key} onClick={() => selectResource(entry.key)} className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${resource === entry.key ? 'bg-[#f4b942] text-[#102a43]' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><span className="w-5 text-center">{entry.key === 'users' ? '◉' : entry.key === 'tenants' ? '⌂' : entry.key === 'plans' ? '◆' : '↻'}</span>{entry.label}</button>)}</nav>
      <div className="hidden border-t border-white/10 px-6 py-5 md:block"><div className="mb-3 text-xs text-slate-400">Sesión activa</div><div className="truncate text-sm font-semibold">{user?.email}</div><button onClick={logout} className="mt-4 text-sm text-[#f4b942] hover:text-white">Cerrar sesión</button></div>
    </aside>
    <main className="min-w-0 flex-1 p-4 sm:p-8"><header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#187c8c]">Operaciones</p><h1 className="text-3xl font-black tracking-tight">{resources.find((entry) => entry.key === resource)?.label}</h1><p className="mt-1 text-sm text-slate-500">Administra registros y relaciones de tu plataforma.</p></div><button onClick={openCreate} className="rounded-lg bg-[#187c8c] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#126571]">+ Nuevo {resources.find((entry) => entry.key === resource)?.singular}</button></header>
      {notice && <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}{error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><span className="text-sm font-bold text-slate-700">{items.length} registros</span><button onClick={() => loadItems()} className="text-sm font-semibold text-[#187c8c]">Actualizar</button></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columnsFor(resource).map((column) => <th key={column[0]} className="px-5 py-4 font-bold">{column[1]}</th>)}<th className="px-5 py-4 text-right">Acciones</th></tr></thead><tbody className="divide-y divide-slate-100">{loading ? <tr><td colSpan={columnsFor(resource).length + 1} className="px-5 py-12 text-center text-slate-500">Cargando...</td></tr> : items.length === 0 ? <tr><td colSpan={columnsFor(resource).length + 1} className="px-5 py-12 text-center text-slate-500">No hay registros todavía.</td></tr> : items.map((item) => <tr key={item.id} className="hover:bg-slate-50">{columnsFor(resource).map(([key]) => <td key={key} className="max-w-[240px] truncate px-5 py-4 font-medium text-slate-700">{key === 'createdAt' || key === 'endDate' ? (item[key] ? new Date(item[key]).toLocaleDateString('es-ES') : 'Sin fecha') : key === 'isActive' ? (item[key] ? 'Activo' : 'Inactivo') : displayValue(item[key])}</td>)}<td className="px-5 py-4 text-right"><button onClick={() => openEdit(item)} className="mr-3 font-semibold text-[#187c8c]">Editar</button><button onClick={() => remove(item)} className="font-semibold text-red-600">Eliminar</button></td></tr>)}</tbody></table></div></section>
    </main>
    {editing && <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#102a43]/50 p-4"><form onSubmit={save} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-black">{editing.id ? 'Editar' : 'Nuevo'} {resources.find((entry) => entry.key === resource)?.singular}</h2><button type="button" onClick={() => setEditing(null)} className="text-2xl text-slate-400">×</button></div><FormFields resource={resource} form={form} setForm={setForm} /><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600">Cancelar</button><button className="rounded-lg bg-[#187c8c] px-5 py-2 text-sm font-bold text-white">Guardar</button></div></form></div>}
  </div></ProtectedRoute>;
}
function FormFields({ resource, form, setForm }: { resource: Resource; form: RecordData; setForm: (value: RecordData) => void }) {
  const update = (key: string, value: any) => setForm({ ...form, [key]: value });
  const field = (key: string, label: string, type = 'text') => <label className="block"><span className="mb-1 block text-sm font-semibold text-slate-700">{label}</span><input required={['email', 'name', 'slug', 'planName'].includes(key)} type={type} value={form[key] ?? ''} onChange={(event) => update(key, type === 'number' ? Number(event.target.value) : event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#187c8c]" /></label>;
  if (resource === 'users') return <div className="grid gap-4">{field('email', 'Correo', 'email')}{field('password', 'Contraseña', 'password')}<label className="block"><span className="mb-1 block text-sm font-semibold text-slate-700">Rol</span><select value={form.roles?.[0] ?? 'USER'} onChange={(event) => update('roles', [event.target.value])} className="w-full rounded-lg border border-slate-300 px-3 py-2"><option>USER</option><option>ADMIN</option><option>TENANT_ADMIN</option><option>TENANT_USER</option></select></label></div>;
  if (resource === 'tenants') return <div className="grid gap-4 sm:grid-cols-2">{field('name', 'Nombre')}{field('slug', 'Slug')}{field('email', 'Correo', 'email')}{field('phone', 'Teléfono')}<label className="block"><span className="mb-1 block text-sm font-semibold text-slate-700">Estado</span><select value={form.status} onChange={(event) => update('status', event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2"><option>TRIAL</option><option>ACTIVE</option><option>SUSPENDED</option><option>EXPIRED</option></select></label><label className="block"><span className="mb-1 block text-sm font-semibold text-slate-700">Módulo</span><select value={form.moduleType} onChange={(event) => update('moduleType', event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2"><option>CUSTOM</option><option>BOTICA</option><option>FERRETERIA</option><option>BODEGA</option><option>RESTAURANTE</option><option>PELUQUERIA</option><option>GIMNASIO</option></select></label>{field('description', 'Descripción')}</div>;
  if (resource === 'plans') return <div className="grid gap-4 sm:grid-cols-2">{field('name', 'Nombre')}{field('price', 'Precio', 'number')}{field('trialDays', 'Días de prueba', 'number')}{field('maxUsers', 'Máximo de usuarios', 'number')}{field('maxStorage', 'Almacenamiento (MB)', 'number')}<label className="block"><span className="mb-1 block text-sm font-semibold text-slate-700">Ciclo de facturación</span><select value={form.billingCycle} onChange={(event) => update('billingCycle', event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2"><option>MONTHLY</option><option>QUARTERLY</option><option>YEARLY</option><option>LIFETIME</option></select></label>{field('description', 'Descripción')}</div>;
  return <div className="grid gap-4 sm:grid-cols-2">{field('tenantId', 'ID del tenant')}{field('planName', 'Nombre del plan')}{field('price', 'Precio', 'number')}{field('endDate', 'Fecha de vencimiento', 'date')}<label className="block"><span className="mb-1 block text-sm font-semibold text-slate-700">Ciclo</span><select value={form.billingCycle} onChange={(event) => update('billingCycle', event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2"><option>MONTHLY</option><option>QUARTERLY</option><option>YEARLY</option><option>LIFETIME</option></select></label></div>;
}
