'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMaskito } from '@maskito/react';
import { PlusIcon } from 'lucide-react';

import { addExpenseSchema } from '@/schemas/add-expense';
import { addCents, digitsFromString } from '@/libs/utils';
import { formatters } from '@/libs/formatters';
import { categories } from '@/libs/categories';
import { dateMaskOptions } from '@/libs/masks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFieldGroup,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AddExpenseDialog: React.FC = () => {
  const dateInputRef = useMaskito({ options: dateMaskOptions });

  const form = useForm<z.infer<typeof addExpenseSchema>>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      description: '',
      amount: 'R$ 0,01',
      date: formatters.date(new Date()),
      category_id: 1,
    },
  });

  function handleSubmit(values: z.infer<typeof addExpenseSchema>) {
    console.log(values);
  }

  function handleAmountChange(
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof addExpenseSchema>, 'amount'>
  ) {
    const digits = +addCents(digitsFromString(event.target.value));
    field.onChange(formatters.currency(digits));
  }

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0">
          <PlusIcon size={16} />
          <span>Adicionar nova despesa</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova despesa</DialogTitle>
          <DialogDescription>
            Adicione uma nova despesa para o seu histórico de despesas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={32} />
                  </FormControl>
                  <FormDescription>A descrição desta despesa.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormFieldGroup>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) => handleAmountChange(event, field)}
                        maxLength={13}
                      />
                    </FormControl>
                    <FormDescription>O valor desta despesa.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do gasto</FormLabel>
                    <FormControl>
                      <Input {...field} ref={dateInputRef} onInput={field.onChange} />
                    </FormControl>
                    <FormDescription>A data desta despesa.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldGroup>

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.emoji} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Um categoria para a despesa.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { AddExpenseDialog };
