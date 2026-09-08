Feature: Gestión de horas en clínica veterinaria
  Como usuario de la clínica veterinaria
  Quiero gestionar la reseva de horas médicas para mi mascota
  Para asegurar su atención médica

  Background:
    Given el usuario está en la página de inicio de la clínica veterinaria (https://www.clinicaveterinaria.com)

  # Proceso 1: Reserva de hora veterinaria exitosa
  Scenario: Reservar una hora exitosamente
    Given el usuario ha dado click en el botón "Reservar Hora"
    And se abre modal con calendario para seleccionar fechas
    When el usuario selecciona la fecha "2026-10-15"
    And el usuario selecciona la hora "10:00 AM"
    And el usuario ingresa los datos de su mascota:
      | Nombre     | Edad | Tipo  |
      | Fido       | 3    | Perro |
    And el usuario ingresa sus datos personales:
      | Nombre     | Email               | Teléfono     |
      | Juan Pérez | juanito@mail.cl     | +56912345678 |
    And el usuario confirma la reserva dando click en el botón "Confirmar Reserva"
    Then el sistema debe generar un código de reserva único
    And el sistema debe mostrar un mensaje de confirmación "Reserva realizada exitosamente"
    And el sistema debe enviar un correo de confirmación al email "juanito@mail.cl"

  # Proceso 2: Cancelación de reserva hora veterinaria
  Scenario: Cancelar una reserva existente
    Given el usuario tiene una reserva activa con código "RES-001"
    And el usuario ha dado click en el botón "Mis Reservas"
    When el usuario ingresa el código de reserva "RES-001" en el input de búsqueda
    And el usuario da click en el botón "Cancelar Reserva"
    And el usuario confirma la cancelación en el modal emergente dando click en "Sí, cancelar"
    Then el sistema debe actualizar el estado de la reserva a "Cancelada"
    And el sistema debe mostrar un mensaje de confirmación "Reserva cancelada exitosamente"
    And el sistema debe enviar un correo de notificación al email del usuario
  