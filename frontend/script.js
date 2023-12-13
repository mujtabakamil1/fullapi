$(document).ready(function () {
  const playerList = $('#playerList');

  // Function to fetch and display players
  function fetchplayers() {
      $.ajax({
          url: 'http://localhost:3000/api/Player',
          method: 'GET',
          crossDomain: true,
          xhrFields: {
              withCredentials: true,
          },
          dataType: 'json',
          success: function (data) {
              playerList.empty(); // Clear previous list

              $.each(data, function (index, player) {
                  const listItem = $('<li>').text(`name: ${player.name}, clubname: ${player.clubname}, Salary: ${player.salary}`);

                  // Add update and delete buttons
                  const updateButton = $('<button>').text('Update').on('click', function () {
                      updateplayer(player._id);
                  });

                  const deleteButton = $('<button>').text('Delete').on('click', function () {
                      deleteplayer(player._id);
                  });

                  listItem.append(updateButton, deleteButton);
                  playerList.append(listItem);
              });
          },
          error: function (error) {
              console.error('Error fetching players:', error);
          }
      });
  }

  // Initial fetch on page load
  fetchplayers();

  // Function to add a new player
  window.addplayer = function () {
      const name = $('#name').val();
      const clubname = $('#clubname').val();
      const salary = $('#salary').val();

      $.ajax({
          url: 'http://localhost:3000/api/Player',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ name, clubname, salary }),
          dataType: 'json',
          success: function (data) {
              console.log('New player added:', data);
              // Fetch and display players again after adding a new player
              fetchplayers();
          },
          error: function (error) {
              console.error('Error adding player:', error);
          }
      });
  }

// Function to update an player
window.updateplayer = function (playerId) {
  // Assuming you want to show a prompt for the user to enter new clubname
  const newname = prompt('Enter new name:');
  const newclubname = prompt('Enter new clubname:');
  const newSalary = prompt('Enter new salary:');

  // Make a PUT request to update the player on the server
  $.ajax({
      url: `http://localhost:3000/api/player/${playerId}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ name: newname, clubname: newclubname, salary: newSalary }),
      dataType: 'json',
      success: function (data) {
          console.log(`player with ID ${playerId} updated:`, data);
          // Fetch and display players again after updating an player
          fetchplayers();
      },
      error: function (error) {
          console.error(`Error updating player with ID ${playerId}:`, error);
      }
  });
}

// Function to delete an player
window.deleteplayer = function (playerId) {
  // Assuming you want to show a confirmation dialog
  const confirmed = confirm('Are you sure you want to delete this player?');

  if (confirmed) {
      // Make a DELETE request to remove the player from the server
      $.ajax({
          url: `http://localhost:3000/api/player/${playerId}`,
          method: 'DELETE',
          success: function (data) {
              console.log(`player with ID ${playerId} deleted:`, data);
              // Fetch and display players again after deleting an player
              fetchplayers();
          },
          error: function (error) {
              console.error(`Error deleting player with ID ${playerId}:`, error);
          }
      });
  }
}

});
