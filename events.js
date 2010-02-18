//
//  This file is part of rtGui.  http://rtgui.googlecode.com/
//  Copyright (C) 2007-2008 Simon Hall.
//  Modifications (C) 2010 James Nylen.
//
//  rtGui is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  rtGui is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with rtGui.  If not, see <http://www.gnu.org/licenses/>.


// Set up event handlers

$(function() {
  $('#debug-tab').click(function() {
    var dbg = $('#debug:visible').length;
    $(this)[dbg ? 'removeClass' : 'addClass']('current');
    $('#debug').css('display', dbg ? 'none' : 'block');
    debug('Waiting for refresh...');
    return false;
  });
  
  $('#torrents-header a.sort').click(function() {
    setCurrentSort($(this).attr('rel'), $(this));
    return false;
  });
  
  $('#navlist a.view').click(function() {
    setCurrentView($(this).attr('rel'), $(this));
    return false;
  });
  
  $('#control-form').ajaxForm(function() {
    $('#control-form input[type=checkbox]').attr('checked', false);
    updateTorrentsNow();
  });
  
  $('div.torrent-container').live('click', function(e) {
    $(this).find('input[type=checkbox]').not(e.target)
    .attr('checked', function() {
      return !this.checked;
    });
  });
  
  $('a.dialog').live('click', function() {
    var dims = $(this).attr('rel').split(':');
    showDialog($(this).attr('href'), dims[0], dims[1]);
    return false;
  });
  
  $('a.ajax').live('click', function() {
    var stdMessage = 'Are you sure you want to remove this torrent';
    var messages = {
      'delete': stdMessage + '?  Its data will not be deleted.',
      'purge': stdMessage + ' torrent AND delete its data?'
    };
    if($(this).hasClass('confirm')
    && !confirm(messages[$(this).attr('rel')])) {
      return false;
    }
    $.get($(this).attr('href'), function(d) {
      updateTorrentsNow();
    });
    return false;
  });
});
