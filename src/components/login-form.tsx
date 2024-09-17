// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AtSign, Lock, AlertCircle } from "lucide-react"

// const formSchema = z.object({
//   email: z.string().email({ message: "Correo electrónico inválido" }),
//   password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
// })

// export function LoginFormComponent() {
//   const [error, setError] = useState("")

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Aquí iría la lógica de autenticación
//     console.log(values)
//     setError("Credenciales inválidas. Por favor, inténtalo de nuevo.")
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 ">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
//           <CardDescription className="text-center">
//             Ingresa tus credenciales para acceder a tu cuenta
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Correo electrónico</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input placeholder="tu@ejemplo.com" className="pl-10" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Contraseña</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input type="password" placeholder="••••••" className="pl-10" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}
//               <Button type="submit" className="w-full">
//                 Iniciar Sesión
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Button variant="link" className="text-sm">
//             ¿Olvidaste tu contraseña?
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }