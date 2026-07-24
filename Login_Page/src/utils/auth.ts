const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Apartment {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  address?: string;
  hasUnitsConfigured?: boolean;
  createdBy?: string;
  createdAt?: string;
}

/**
 * Login with email and password
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

/**
 * Register a new user
 */
export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: string = 'user'
): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

/**
 * Get the auth token from localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

/**
 * Get the current user from localStorage
 */
export function getCurrentUser(): AuthUser | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Logout the user
 */
export function logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

/**
 * Make an authenticated API call
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as any)['Authorization'] = `Bearer ${token}`;
  }

  const method = options.method || 'GET';
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`\n[fetchAPI] === REQUEST START ===`);
  console.log(`[fetchAPI] Method: ${method}`);
  console.log(`[fetchAPI] URL: ${url}`);
  console.log(`[fetchAPI] Token exists: ${!!token}`);
  console.log(`[fetchAPI] Token length: ${token?.length || 0}`);
  if (token) {
    console.log(`[fetchAPI] Token preview: ${token.substring(0, 20)}...`);
  }
  console.log(`[fetchAPI] Headers:`, {
    'Content-Type': headers['Content-Type'],
    'Authorization': token ? '***REDACTED***' : 'NOT PROVIDED'
  });

  try {
    console.log(`[fetchAPI] Initiating fetch...`);
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[fetchAPI] === RESPONSE RECEIVED ===`);
    console.log(`[fetchAPI] Status: ${response.status} ${response.statusText}`);
    console.log(`[fetchAPI] Headers:`, {
      'content-type': response.headers.get('content-type'),
      'content-length': response.headers.get('content-length'),
    });

    const data = await response.json();
    console.log(`[fetchAPI] Response body:`, data);

    if (!response.ok) {
      console.error(`[fetchAPI] ❌ NOT OK (${response.status})`);
      
      if (response.status === 401) {
        console.error('[fetchAPI] Unauthorized');
        throw new Error(data.message || 'Unauthorized');
      }
      
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    console.log(`[fetchAPI] ✅ SUCCESS`);
    console.log(`[fetchAPI] === REQUEST END ===\n`);
    return data;
  } catch (error: any) {
    console.error(`[fetchAPI] ❌ FETCH ERROR:`, error.message);
    console.error(`[fetchAPI] === REQUEST END ===\n`);
    throw error;
  }
}

/**
 * Set auth token and user in localStorage
 */
export function setAuth(token: string, user: AuthUser): void {
  console.log('[AUTH] Saving token and user:', user.email);
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Apartment API functions
 */
export async function getApartments(): Promise<Apartment[]> {
  console.log('[getApartments] Fetching apartments...');
  return fetchAPI('/api/apartments');
}

export async function getApartmentById(id: string): Promise<Apartment> {
  console.log('[getApartmentById] Fetching apartment:', id);
  return fetchAPI(`/api/apartments/${id}`);
}

export async function createApartment(apartment: Omit<Apartment, 'id' | 'createdAt' | 'createdBy'>): Promise<Apartment> {
  console.log('[createApartment] Attempting to create:', apartment.name);
  
  const token = getAuthToken();
  console.log('[createApartment] Token exists:', !!token);
  console.log('[createApartment] Token length:', token?.length || 0);
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  return fetchAPI('/api/apartments', {
    method: 'POST',
    body: JSON.stringify(apartment),
  });
}

export async function updateApartment(id: string, apartment: Partial<Apartment>): Promise<Apartment> {
  console.log('[updateApartment] Updating:', id);
  return fetchAPI(`/api/apartments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(apartment),
  });
}

export async function deleteApartment(id: string): Promise<void> {
  console.log('[deleteApartment] Deleting:', id);
  return fetchAPI(`/api/apartments/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Unit API functions
 */
export interface Unit {
  id: string;
  apartment?: any;
  apartmentId?: string;
  tenantId?: string;
  unitNumber: string;
  unitType?: string;
  baseRent: number;
  charges?: Array<{
    id: string;
    name: string;
    amount: number;
    isOptional: boolean;
    type: string;
  }>;
  status?: string;
  floor?: number;
  squareFeet?: number;
  createdAt?: string;
}

export async function getUnits(): Promise<Unit[]> {
  console.log('[getUnits] Fetching all units...');
  return fetchAPI('/api/units');
}

export async function getUnitsByApartment(apartmentId: string): Promise<Unit[]> {
  console.log('[getUnitsByApartment] Fetching units for apartment:', apartmentId);
  return fetchAPI(`/api/units/apartment/${apartmentId}`);
}

export async function getUnitById(id: string): Promise<Unit> {
  console.log('[getUnitById] Fetching unit:', id);
  return fetchAPI(`/api/units/${id}`);
}

export async function createUnit(unit: Omit<Unit, 'id' | 'createdAt'>): Promise<Unit> {
  console.log('[createUnit] Creating unit:', unit);
  return fetchAPI('/api/units', {
    method: 'POST',
    body: JSON.stringify(unit),
  });
}

export async function updateUnit(id: string, unit: Partial<Unit>): Promise<Unit> {
  console.log('[updateUnit] Updating unit:', id, unit);
  return fetchAPI(`/api/units/${id}`, {
    method: 'PUT',
    body: JSON.stringify(unit),
  });
}

export async function deleteUnit(id: string): Promise<{ message: string }> {
  console.log('[deleteUnit] Deleting unit:', id);
  return fetchAPI(`/api/units/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Tenant API functions
 */
export interface Tenant {
  id: string;
  apartment?: {
    id: string;
    name: string;
  };
  name: string;
  email: string;
  phone: string;
  unit: string;
  rentAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  avatar: string;
  joiningDate: string;
  paymentDeadline?: string;
  status: 'active' | 'left' | 'vacant';
  idNumber: string;
  birthDate: string;
  numberOfRooms?: number;
  waterUnits?: number;
  leftReason?: string;
  leftDate?: string;
  hasAccount?: boolean;
  username?: string;
}

export async function getTenants(): Promise<Tenant[]> {
  console.log('[getTenants] Fetching all tenants...');
  return fetchAPI('/api/tenants');
}

export async function getTenantsByApartment(apartmentId: string): Promise<Tenant[]> {
  console.log('[getTenantsByApartment] Fetching tenants for apartment:', apartmentId);
  return fetchAPI(`/api/tenants/apartment/${apartmentId}`);
}

export async function getTenantById(id: string): Promise<Tenant> {
  console.log('[getTenantById] Fetching tenant:', id);
  return fetchAPI(`/api/tenants/${id}`);
}

export async function createTenant(tenant: Omit<Tenant, 'id'>): Promise<Tenant> {
  console.log('[createTenant] Creating tenant:', tenant.name);
  return fetchAPI('/api/tenants', {
    method: 'POST',
    body: JSON.stringify(tenant),
  });
}

export async function updateTenant(id: string, tenant: Partial<Tenant>): Promise<Tenant> {
  console.log('[updateTenant] Updating tenant:', id);
  return fetchAPI(`/api/tenants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tenant),
  });
}

export async function deleteTenant(id: string): Promise<void> {
  console.log('[deleteTenant] Deleting tenant:', id);
  return fetchAPI(`/api/tenants/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Payment API functions
 */
export interface Payment {
  id: string;
  tenant?: {
    id: string;
    name: string;
  };
  apartment?: {
    id: string;
    name: string;
  };
  tenantName: string;
  unit: string;
  amount: number;
  date: string;
  method: 'cash' | 'bank_transfer' | 'online' | 'check';
  status: 'claimed' | 'unclaimed';
  transactionId?: string;
  notes?: string;
  createdAt?: string;
}

export async function getPayments(): Promise<Payment[]> {
  console.log('[getPayments] Fetching all payments...');
  return fetchAPI('/api/payments');
}

export async function getPaymentsByApartment(apartmentId: string): Promise<Payment[]> {
  console.log('[getPaymentsByApartment] Fetching payments for apartment:', apartmentId);
  return fetchAPI(`/api/payments/apartment/${apartmentId}`);
}

export async function getPaymentById(id: string): Promise<Payment> {
  console.log('[getPaymentById] Fetching payment:', id);
  return fetchAPI(`/api/payments/${id}`);
}

export async function createPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> {
  console.log('[createPayment] Creating payment:', payment);
  return fetchAPI('/api/payments', {
    method: 'POST',
    body: JSON.stringify(payment),
  });
}

export async function updatePayment(id: string, payment: Partial<Payment>): Promise<Payment> {
  console.log('[updatePayment] Updating payment:', id);
  return fetchAPI(`/api/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payment),
  });
}

export async function deletePayment(id: string): Promise<{ message: string }> {
  console.log('[deletePayment] Deleting payment:', id);
  return fetchAPI(`/api/payments/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Tenant Password Management
 */
export async function resetTenantPassword(tenantId: string): Promise<{ 
  message: string;
  tempPassword: string;
  tenantId: string;
  tenantName: string;
  email: string;
}> {
  console.log('[resetTenantPassword] Resetting password for tenant:', tenantId);
  return fetchAPI(`/api/tenants/${tenantId}/reset-password`, {
    method: 'POST',
  });
}
