import { supabase } from '../config/supabase'

export const getAllBookings = async () => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, rooms(*)');

    if (error) throw error;

    return data
};

export const createBooking = async (bookingData: any) => {
    const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single()

    if (error) throw error;

    return data;
}

export const getBookingById = async (id: number) => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, rooms(*)')
        .eq('id', id)
        .single();

    if (error) throw error;

    return data;
}

export const deleteBooking = async (id: number) => {
    const { error } = await supabase
        .from('booking')
        .delete()
        .eq('id', id)

    if (error) throw error;
}