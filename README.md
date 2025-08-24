
# JobSearch Chile - Frontend

Proyecto Angular 19 para la plataforma de búsqueda de empleos en arquitectura y construcción en Chile.

---

## 🚀 Arquitectura y Estructura

### Estructura de Features

```
src/app/features/
├── public/        # Acceso público (home, búsqueda, detalles, about, pricing)
├── auth/          # Autenticación (login, register)
├── job-seeker/    # Trabajadores (dashboard, postulaciones, perfil, guardados)
├── employer/      # Empresas (dashboard, publicar, gestionar)
└── admin/         # Administración (futuro)
```

### Lazy Loading

Rutas principales y privadas cargadas bajo demanda para optimizar performance y seguridad:

- Rutas públicas: Home, búsqueda, detalles, about, pricing
- Rutas de auth: login, register
- Rutas privadas: job-seeker y employer (lazy loading)

### Microservicios Backend

- Spring Boot Gateway & Auth
- NestJS para lógica de negocio (jobs, job-seeker, employer, notifications, payments)
- PostgreSQL, Redis, RabbitMQ

---

## 🛣️ Rutas Principales

| Ruta                | Componente                | Acceso      |
|---------------------|--------------------------|-------------|
| `/`                 | HomeComponent            | Público     |
| `/search-jobs`      | SearchJobsComponent      | Público     |
| `/job-details/:id`  | JobDetailsComponent      | Público     |
| `/about`            | AboutComponent           | Público     |
| `/pricing`          | PaymentsComponent        | Público     |
| `/login`            | LoginComponent           | Público     |
| `/register`         | RegisterComponent        | Público     |
| `/job-seeker/*`     | job-seeker.routes.ts     | Privado     |
| `/employer/*`       | employer.routes.ts       | Privado     |

---

## ⚡ Ventajas de la Arquitectura

- Separación clara por dominio y tipo de usuario
- Lazy loading y bundle splitting automático
- Guards granulares por tipo de usuario y suscripción
- SEO y mobile first
- Escalabilidad y mantenibilidad

---

## 🧑‍💻 Desarrollo

### Servidor de desarrollo

```bash
ng serve
```
Accede a `http://localhost:4200/`

### Generar componentes

```bash
ng generate component features/job-seeker/dashboard
ng generate component features/employer/post-job
```

### Build producción

```bash
ng build --configuration production
```

### Ejecutar tests

```bash
ng test
```

---

## 🛡️ Seguridad

- Guards de autenticación y suscripción
- Interceptores para JWT y refresh token

---

## 📦 Microservicios

| Servicio                | Puerto | Stack      | Dominio         |
|-------------------------|--------|------------|-----------------|
| ms-archi-gateway        | 8080   | Spring     | Gateway         |
| ms-archi-auth-profile   | 8081   | Spring     | Auth/Profile    |
| ms-archi-jobs-public    | 3002   | NestJS     | Jobs Público    |
| ms-archi-job-seeker     | 3003   | NestJS     | Trabajadores    |
| ms-archi-employer       | 3004   | NestJS     | Empresas        |
| ms-archi-notifications  | 3005   | NestJS     | Notificaciones  |
| ms-archi-payments       | 3006   | NestJS     | Pagos           |

---

## 📚 Recursos

- [Angular CLI Docs](https://angular.dev/tools/cli)
- [Tailwind CSS](https://tailwindcss.com/)
- [NestJS](https://nestjs.com/)
- [Spring Boot](https://spring.io/projects/spring-boot)

---

## 💡 Notas

- Estructura modular y escalable
- Listo para PWA y SEO
- Responsive y mobile first
