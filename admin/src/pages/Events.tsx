import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Calendar, Clock, MapPin, Users, Ticket, QrCode, DollarSign, AlertCircle } from 'lucide-react';



interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    sold: number;
    available: boolean;
    qrCodeTemplate: string;
}

interface PurchasedTicket {
    id: string;
    ticketTypeId: string;
    ticketTypeName: string;
    eventId: string;
    eventName: string;
    customerName: string;
    customerEmail: string;
    purchaseDate: string;
    qrCode: string;
    price: number;
    checkedIn: boolean;
    checkInTime?: string;
}
interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    capacity: number;
    registered: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    ticketTypes: TicketType[];
    totalRevenue: number;
}

export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [showTicketsView, setShowTicketsView] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null); //
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
    const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([]);

    // UI state: whether the purchased tickets modal is shown
    const [showPurchasedTicketsView, setShowPurchasedTicketsView] = useState(false);

    // Controlled form state for creating/editing events
    type EventForm = {
        name: string;
        date: string;
        time: string;
        location: string;
        description: string;
        capacity: number;
        status: Event['status'];
    };

    const [eventForm, setEventForm] = useState<EventForm>({
        name: '',
        date: '',
        time: '',
        location: '',
        description: '',
        capacity: 0,
        status: 'upcoming',
    });

    // Controlled form state for creating/editing ticket types
    type TicketForm = {
        name: string;
        price: number;
        description: string;
        quantity: number;
        available: boolean;
    };

    const [ticketForm, setTicketForm] = useState<TicketForm>({
        name: '',
        price: 0,
        description: '',
        quantity: 0,
        available: true,
    });

    const [events, setEvents] = useState<Event[]>([
        {
            id: '1',
            name: 'Live Jazz Night',
            date: '2024-02-15',
            time: '20:00',
            location: 'Main Bar',
            description: 'Enjoy live jazz music with our house band',
            capacity: 80,
            registered: 65,
            status: 'upcoming',
            totalRevenue: 975,
            ticketTypes: [
                { id: 't1', name: 'Regular', price: 15, description: 'Standard entry', quantity: 50, sold: 45, available: true, qrCodeTemplate: 'TEMPLATE-1-t1-1234567890' },
                {
                    id: 't2', name: 'VIP', price: 30, description: 'VIP section with table service', quantity: 30, sold: 20, available: true, qrCodeTemplate: 'TEMPLATE-1-t2-1234567891'
                }
            ]
        },
        {
            id: '2',
            name: 'Wine Tasting Evening',
            date: '2024-02-20',
            time: '19:00',
            location: 'Wine Cellar',
            description: 'Sample premium wines from around the world',
            capacity: 30,
            registered: 30,
            status: 'upcoming',
            totalRevenue: 1500,
            ticketTypes: [
                {
                    id: 't3', name: 'Standard', price: 50, description: 'Wine tasting experience', quantity: 30, sold: 30, available: false, qrCodeTemplate: 'TEMPLATE-2-t3-1234567892'
                }
            ]
        },
        {
            id: '3',
            name: 'New Year Party',
            date: '2024-01-01',
            time: '22:00',
            location: 'Grand Hall',
            description: 'Ring in the new year with us',
            capacity: 200,
            registered: 198,
            status: 'completed',
            totalRevenue: 9900,
            ticketTypes: [
                {
                    id: 't4', name: 'Regular', price: 40, description: 'Standard entry', quantity: 150, sold: 148, available: false, qrCodeTemplate: 'TEMPLATE-2-t3-1234567882'
                },
                {
                    id: 't5', name: 'VIP', price: 80, description: 'VIP experience', quantity: 50, sold: 50, available: false, qrCodeTemplate: 'TEMPLATE-2-t3-1234567894'
                }
            ]
        },
    ]);



    const statuses = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Summary derived values
    const totalEvents = events.length;
    const ticketsSold = events.reduce((sum, e) => sum + e.ticketTypes.reduce((s, t) => s + t.sold, 0), 0);
    const totalRevenue = events.reduce((sum, e) => sum + (e.totalRevenue || 0), 0);
    const upcomingCount = events.filter(e => e.status === 'upcoming').length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'ongoing':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'completed':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const handleScanTicket = (qrCode: string) => {
        const ticket = purchasedTickets.find(t => t.qrCode === qrCode);

        if (!ticket) {
            return { success: false, message: 'Invalid ticket code' };
        }

        if (ticket.checkedIn) {
            return {
                success: false,
                message: `Already used at ${new Date(ticket.checkInTime!).toLocaleString()}`
            };
        }

        // Mark as checked in
        setPurchasedTickets(purchasedTickets.map(t =>
            t.id === ticket.id
                ? { ...t, checkedIn: true, checkInTime: new Date().toISOString() }
                : t
        ));

        return { success: true, message: 'Entry granted', ticket };
    };
    
    const generateId = (prefix = '') => `${prefix}${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;

    const handleAddEvent = () => {
        setEditingEvent(null);
        // reset controlled form
        setEventForm({ name: '', date: '', time: '', location: '', description: '', capacity: 0, status: 'upcoming' });
        setShowEventModal(true);
    };

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setEventForm({ name: event.name, date: event.date, time: event.time, location: event.location, description: event.description, capacity: event.capacity, status: event.status });
        setShowEventModal(true);
    };

    const handleViewTickets = (event: Event) => {
        setSelectedEvent(event);
        setShowTicketsView(true);
    };

    const handleViewPurchasedTickets = (event: Event) => {
        setSelectedEvent(event);
        setShowPurchasedTicketsView(true);
    };

    const handleAddTicket = () => {
        setEditingTicket(null);
        setTicketForm({ name: '', price: 0, description: '', quantity: 0, available: true });
        setShowTicketModal(true);
    };

    const handleEditTicket = (ticket: TicketType) => {
        setEditingTicket(ticket);
        setTicketForm({ name: ticket.name, price: ticket.price, description: ticket.description, quantity: ticket.quantity, available: ticket.available });
        setShowTicketModal(true);
    };

    const handleDeleteEvent = (eventId: string) => {
        setEvents(events.filter(e => e.id !== eventId));
        if (selectedEvent?.id === eventId) {
            setSelectedEvent(null);
            setShowTicketsView(false);
            setShowPurchasedTicketsView(false);
        }
    };

    const handleDeleteTicket = (ticketId: string) => {
        if (!selectedEvent) return;
        const updated = events.map(e => e.id === selectedEvent.id ? { ...e, ticketTypes: e.ticketTypes.filter(t => t.id !== ticketId) } : e);
        setEvents(updated);
        const newSelected = updated.find(e => e.id === selectedEvent.id) || null;
        setSelectedEvent(newSelected);
    };

    const saveEvent = () => {
        if (!eventForm.name.trim()) return alert('Event name is required');
        if (!eventForm.date) return alert('Event date is required');

        if (editingEvent) {
            const updated = events.map(e => e.id === editingEvent.id ? { ...e, name: eventForm.name, date: eventForm.date, time: eventForm.time, location: eventForm.location, description: eventForm.description, capacity: eventForm.capacity, status: eventForm.status } : e);
            setEvents(updated);
            setEditingEvent(null);
        } else {
            const newEvent: Event = {
                id: generateId('ev-'),
                name: eventForm.name,
                date: eventForm.date,
                time: eventForm.time,
                location: eventForm.location,
                description: eventForm.description,
                capacity: eventForm.capacity,
                registered: 0,
                status: eventForm.status,
                ticketTypes: [],
                totalRevenue: 0,
            };
            setEvents([newEvent, ...events]);
        }
        setShowEventModal(false);
    };

    const saveTicket = () => {
        if (!ticketForm.name.trim()) return alert('Ticket name is required');
        if (!selectedEvent) return alert('No event selected');

        if (editingTicket) {
            const updated = events.map(e => e.id === selectedEvent.id ? { ...e, ticketTypes: e.ticketTypes.map(t => t.id === editingTicket.id ? { ...t, name: ticketForm.name, price: ticketForm.price, description: ticketForm.description, quantity: ticketForm.quantity, available: ticketForm.available } : t) } : e);
            setEvents(updated);
            setSelectedEvent(updated.find(e => e.id === selectedEvent.id) || null);
        } else {
            const newTicket: TicketType = {
                id: generateId('t-'),
                name: ticketForm.name,
                price: ticketForm.price,
                description: ticketForm.description,
                quantity: ticketForm.quantity,
                sold: 0,
                available: ticketForm.available,
                qrCodeTemplate: `TEMPLATE-${generateId('tpl-')}`
            };
            const updated = events.map(e => e.id === selectedEvent.id ? { ...e, ticketTypes: [...e.ticketTypes, newTicket] } : e);
            setEvents(updated);
            setSelectedEvent(updated.find(e => e.id === selectedEvent.id) || null);
        }

        setShowTicketModal(false);
        setEditingTicket(null);
    };

    const addDummyPurchase = () => {
        if (!selectedEvent) return alert('No event selected');
        const ticketType = selectedEvent.ticketTypes[0];
        if (!ticketType) return alert('No ticket types for this event');
        if (ticketType.sold >= ticketType.quantity) return alert('No tickets available for this type');

        const newPurchased: PurchasedTicket = {
            id: generateId('p-'),
            ticketTypeId: ticketType.id,
            ticketTypeName: ticketType.name,
            eventId: selectedEvent.id,
            eventName: selectedEvent.name,
            customerName: 'Guest Customer',
            customerEmail: 'guest@example.com',
            purchaseDate: new Date().toISOString(),
            qrCode: `QR-${generateId('qr-')}`,
            price: ticketType.price,
            checkedIn: false,
        };

        setPurchasedTickets([...purchasedTickets, newPurchased]);

        const updated = events.map(e => e.id === selectedEvent.id ? {
            ...e,
            ticketTypes: e.ticketTypes.map(t => t.id === ticketType.id ? { ...t, sold: t.sold + 1, available: (t.sold + 1) < t.quantity } : t),
            registered: e.registered + 1,
            totalRevenue: e.totalRevenue + ticketType.price,
        } : e);

        setEvents(updated);
        setSelectedEvent(updated.find(e => e.id === selectedEvent.id) || null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events & Ticketing</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage events and ticket types</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalEvents}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Tickets Sold</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{ticketsSold.toLocaleString()}</p>
                        </div>
                        <Ticket className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">${totalRevenue.toFixed(2)}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{upcomingCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>
                                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddEvent}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Event
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Tickets Sold
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Revenue
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                                                <Calendar className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{event.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{event.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {event.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {event.registered}/{event.capacity}
                                            </span>
                                        </div>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                            <div
                                                className={`h-2 rounded-full ${((event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0) >= 90) ? 'bg-red-600' : ((event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0) >= 70 ? 'bg-orange-500' : 'bg-green-600')}`}
                                                style={{ width: `${Math.min((event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0), 100)}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-green-600">${event.totalRevenue.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleViewTickets(event)}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="Manage Tickets"
                                            >
                                                <Ticket className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleViewPurchasedTickets(event)}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="View Sold Tickets & QR Codes"
                                            >
                                                <QrCode className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditEvent(event)}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title='Edit Event'
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button title='Delete Event' onClick={() => handleDeleteEvent(event.id)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showEventModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {editingEvent ? 'Edit Event' : 'Create New Event'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    value={eventForm.name}
                                    onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Live Jazz Night"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={eventForm.date}
                                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        value={eventForm.time}
                                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={eventForm.location}
                                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Main Bar"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Total Capacity
                                    </label>
                                    <input
                                        type="number"
                                        value={eventForm.capacity}
                                        onChange={(e) => setEventForm({ ...eventForm, capacity: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={eventForm.description}
                                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe your event..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    value={eventForm.status}
                                    onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as Event['status'] })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEventModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveEvent}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingEvent ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showTicketsView && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Ticket Types - {selectedEvent.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowTicketsView(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                                    <Ticket className="w-4 h-4" />
                                    <span className="text-sm font-medium">Total Tickets</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {selectedEvent.ticketTypes.reduce((sum, t) => sum + t.quantity, 0)}
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm font-medium">Sold</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {selectedEvent.ticketTypes.reduce((sum, t) => sum + t.sold, 0)}
                                </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm font-medium">Revenue</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${selectedEvent.totalRevenue.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ticket Types</h3>
                            <button
                                onClick={handleAddTicket}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Ticket Type
                            </button>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-medium mb-1">About Ticket Types</p>
                                    <p>Ticket types are templates that customers can purchase. Each purchase generates a unique QR code for verification. No QR codes are created until a customer completes payment.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {selectedEvent.ticketTypes.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {ticket.name}
                                                </h4>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.available
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                    }`}>
                                                    {ticket.available ? 'Available' : 'Sold Out'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                {ticket.description}
                                            </p>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                        ${ticket.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sold / Total</p>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {ticket.sold} / {ticket.quantity}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Remaining</p>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {ticket.quantity - ticket.sold}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEditTicket(ticket)}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteTicket(ticket.id)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showPurchasedTicketsView && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sold Tickets - {selectedEvent.name}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => addDummyPurchase()} className="px-3 py-2 bg-green-600 text-white rounded">Add Dummy Purchase</button>
                                <button onClick={() => setShowPurchasedTicketsView(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl">×</button>
                            </div>
                        </div>

                        <div>
                            {purchasedTickets.filter(p => p.eventId === selectedEvent.id).length === 0 ? (
                                <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-400">No sold tickets yet. Use "Add Dummy Purchase" to simulate a sale.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead className="text-sm text-gray-500 dark:text-gray-400 text-left">
                                            <tr>
                                                <th className="px-4 py-2">Customer</th>
                                                <th className="px-4 py-2">Ticket</th>
                                                <th className="px-4 py-2">Purchased</th>
                                                <th className="px-4 py-2">Price</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchasedTickets.filter(p => p.eventId === selectedEvent.id).map(p => (
                                                <tr key={p.id} className="border-t border-gray-100 dark:border-gray-700">
                                                    <td className="px-4 py-3 text-sm">{p.customerName} <div className="text-xs text-gray-500">{p.customerEmail}</div></td>
                                                    <td className="px-4 py-3 text-sm">{p.ticketTypeName}</td>
                                                    <td className="px-4 py-3 text-sm">{new Date(p.purchaseDate).toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-sm">${p.price.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-sm">{p.checkedIn ? `Checked in at ${new Date(p.checkInTime!).toLocaleString()}` : 'Not checked in'}</td>
                                                    <td className="px-4 py-3 text-sm text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => { const res = handleScanTicket(p.qrCode); alert(res.message); }} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Check In</button>
                                                            <button onClick={() => { navigator.clipboard?.writeText(p.qrCode); alert('QR code copied'); }} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Copy QR</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showTicketModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {editingTicket ? 'Edit Ticket Type' : 'Create New Ticket Type'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Ticket Type Name
                                </label>
                                <input
                                    type="text"
                                    value={ticketForm.name}
                                    onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., VIP, Regular, Early Bird"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={ticketForm.description}
                                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe what this ticket includes..."
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={ticketForm.price}
                                        onChange={(e) => setTicketForm({ ...ticketForm, price: Number(e.target.value) })}
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Quantity Available
                                    </label>
                                    <input
                                        type="number"
                                        value={ticketForm.quantity}
                                        onChange={(e) => setTicketForm({ ...ticketForm, quantity: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="available"
                                    checked={ticketForm.available}
                                    onChange={(e) => setTicketForm({ ...ticketForm, available: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Make ticket available for purchase
                                </label>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowTicketModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveTicket}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
