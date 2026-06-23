-- Enable Row Level Security (RLS) for the todos table
alter table todos enable row level security;

-- Policy: Allow users to select their own todos
create policy "users can view their todos"
  on todos
  for select
  using (auth.uid() = user_id);

-- Policy: Allow users to insert their own todos
create policy "users can create todos"
  on todos
  for insert
  with check (auth.uid() = user_id);

-- Policy: Allow users to update their own todos
create policy "users can update their own todos"
  on todos
  for update
  using (auth.uid() = user_id);

-- Policy: Allow users to delete their own todos
create policy "users can delete their own todos"
  on todos
  for delete
  using (auth.uid() = user_id);