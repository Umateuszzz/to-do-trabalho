-- Create todos table
create table public.todos (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  titulo text not null,
  descricao text,
  concluida boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Policy: Users can only see their own todos
create policy "Users can view their own todos"
  on public.todos for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own todos
create policy "Users can insert their own todos"
  on public.todos for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own todos
create policy "Users can update their own todos"
  on public.todos for update
  using (auth.uid() = user_id);

-- Policy: Users can delete their own todos
create policy "Users can delete their own todos"
  on public.todos for delete
  using (auth.uid() = user_id);